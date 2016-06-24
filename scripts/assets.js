"use strict";
const fs = require("fs");
const path = require("path");
const request = require("request");
const rimraf = require("rimraf");
const color = require("colors");

const DRY_RUN = process.argv.includes("--dry-run");

const { entries, createDir, async, emoji } = require("./utils");
const PROVIDERS = require("./providers");
const DICTIONNARY = require("../emoji-source.json");
const ASSETS_DIR = path.join(__dirname, "..", "assets");

function createProviderFolders(provider) {
    createDir(__dirname, "..", "assets", provider);
}

function getImage(url) {
    return new Promise((resolve, reject) => {
        request({
            url,
            encoding: null
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                return resolve(body);
            }
            return reject(
                (response && response.statusCode === 404 && new Error(`Error 404 '${url}'`)) ||
                error
            );
        })
    })
}

const fetchProviderImage = async(function* (provider, name, varation) {
    const { type, name: providerName, url, preProcessName } = provider;
    let rawImage;
    let imageName = preProcessName ? preProcessName(name) : name;

    const warn = (exception) => {
        console.warn("Warning".yellow.bold, providerName.grey, `${emoji(name)}  `, name.cyan, exception.message);
    }

    try {
        rawImage = yield getImage(url(imageName));
    } catch (exception) {
        // We consider we don't have an image for that one
        rawImage = false;
        // But maybe the image only exist with the varation. Let's try.
        if (varation) {
            imageName = preProcessName ? preProcessName(varation) : varation;
            try {
                rawImage = yield getImage(url(imageName));
            } catch (ex) {
                warn(ex);
            }
        } else {
            warn(exception);
        }
    }
    return [providerName, `${name}.${type}`, rawImage];
});

const fetchImage = function (name, variation) {
    return Promise.all(PROVIDERS.map(provider => fetchProviderImage(provider, name, variation)));
};

const fetchEmojiImage = async(function *(name, variation = false) {
    const images = yield fetchImage(name, variation);
    const results = {};
    images.forEach(([ providerName, name, buffer ]) => {
        results[providerName] = [name, buffer];
    })
    return results;
})

console.log("Preparing filesystem".bold);
console.log("Cleaning folders...");
!DRY_RUN && rimraf.sync(ASSETS_DIR);

console.log("Creating default folders structure...");
!DRY_RUN && createDir(__dirname, "..", "assets");
!DRY_RUN && PROVIDERS.forEach(({ name }) => createProviderFolders(name));

console.log("Processing assets computation".bold);
const ASSETS = DICTIONNARY.reduce((dict, emoji) => {
    const { unified, variations } = emoji;
    const name = unified.toLowerCase();
    const variation = variations && variations.length && variations[0].toLowerCase();
    dict.push(fetchEmojiImage(name, variation));
    if (emoji.skin_variations) {
        for(const [skinVariation, skinEmoji] of entries(emoji.skin_variations)) {
            dict.push(fetchEmojiImage(skinEmoji.unified.toLowerCase()));
        }
    }
    return dict;
}, []);
console.log(`+ ${ASSETS.length} emojis in total.`);

console.log("Downloading assets".bold);

function writeToDisk(name, provider, buffer) {
    const fileType = name.endsWith(".svg") ? "svg" : "png";
    const folderPath = path.join(".", "assets", provider, fileType);
    try {
        fs.accessSync(folderPath);
    } catch(ex) {
        createDir(".", "assets", provider, fileType);
    }
    fs.writeFileSync(
        path.join(".", "assets", provider, fileType, name),
        buffer
    );
}

Promise
    .all(ASSETS)
    .then(emojis => {
        const counters = {};
        emojis.forEach(providers => {
            for (const [provider, [name, buffer]] of entries(providers)) {
                if (buffer) {
                    if (!counters[provider]) {
                        counters[provider] = 0;
                    }
                    writeToDisk(name, provider, buffer);
                    counters[provider]++;
                }
            }
        });

        console.log(`Assets download complete.`);

        for(const [provider, counter] of entries(counters)) {
            console.log(`${provider}:`, `${counter}`.grey);
        }

    })
    .catch(error => {
        console.error("Error".red.bold, error);
    });
