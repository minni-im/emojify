"use strict";
const fs = require("fs");
const path = require("path");
const request = require("request");

module.exports = {
    createDir() {
        fs.mkdirSync(path.join.apply(null, arguments));
    },

    fileExists(path) {
        try {
            fs.accessSync(path);
            return true;
        } catch (exception) {
            return false;
        }
    },

    entries: function* entries(obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    },

    async(makeGenerator) {
        return function(...args) {
            const generator = makeGenerator.apply(this, args);
            function handle(result) {
                if (result.done) {
                    return result.value;
                }
                return result.value.then(
                    res => handle(generator.next(res)),
                    error => handle(generator.throw(error))
                );
            }
            return handle(generator.next());
        }
    },

    emoji(codepointsAsString) {
        return String.fromCodePoint(...codepointsAsString
            .split("-")
            .map(codepoint => parseInt(codepoint, 16))
        );
    },

    download(url, filePath, dryRun = false) {
        return new Promise((resolve, reject) => {
            request.get({ url, encoding: null })
                .on("response", response => {
                    if (response.statusCode === 404) {
                        return reject(new Error(`Error 404: ${url}`));
                    }
                    resolve(true);
                    if (!dryRun) {
                        response.pipe(
                            fs.createWriteStream(filePath)
                        ).on("error", error => console.error(error));
                    }
                })
                .on("error", error => reject(error));
        });
    },

    guard(size, fn) {
        const queue = [];
        const run = (fn, args) => {
            if (size) {
                size--;
                const result = new Promise((resolve, reject) => {
                    resolve(fn(...args))
                });
                result.then(release, release);
                return result;
            } else {
                return new Promise(resolve => {
                    queue.push({ resolve, fn, args });
                })
            }
        }

        const release = () => {
            size++;
            if (queue.length) {
                const { resolve, fn, args } = queue.shift();
                resolve(run(fn, args));
            }
        }

        return function(...args) {
            return run(fn, args);
        }
    }
}
