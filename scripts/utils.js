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

    download(url, filePath) {
        return new Promise((resolve, reject) => {
            request(url).on("end", () => {
                return resolve();
            }).on("error", (error) => {
                return reject(error);
            }).pipe(fs.createWriteStream(filePath));
        });
    }
}
