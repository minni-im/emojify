"use strict";
const fs = require("fs");
const path = require("path");
const request = require("request");
const rimraf = require("rimraf");
const color = require("colors");

const DRY_RUN = process.argv.includes("--dry-run");

const { entries, createDir, async, emoji, download, guard } = require("./utils");
const PROVIDERS = require("../data/providers");
const DICTIONNARY = require("../data/emoji-list.json");
const ASSETS_DIR = path.join(__dirname, "..", "assets");
const MAX_PARRALEL_DOWNLOAD = 10;
const guardedDownload = guard(MAX_PARRALEL_DOWNLOAD, download);

function createProviderFolders({ type, name }) {
    createDir(__dirname, "..", "assets", name);
    createDir(__dirname, "..", "assets", name, type);
}

const fetchProviderImage = async(function* (provider, name, varation) {
    const { type, name: providerName, url, preProcessName } = provider;
    let downloadOk = false;
    let imageName = preProcessName ? preProcessName(name) : name;
    const filepath = path.join(__dirname, "..", "assets", providerName, type, `${name}.${type}`)

    const warn = (exception) => {
        console.warn("Warning".yellow.bold, providerName.grey, `${emoji(name)}  `, name.cyan, exception.message);
    }

    try {
        downloadOk = yield guardedDownload(url(imageName), filepath, DRY_RUN);
    } catch (exception) {
        // We consider we don't have an image for that one
        // But maybe the image only exist with the varation. Let's try.
        if (varation) {
            imageName = preProcessName ? preProcessName(varation) : varation;
            try {
                downloadOk = yield guardedDownload(url(imageName), filepath, DRY_RUN);
            } catch (ex) {
                warn(ex);
            }
        } else {
            warn(exception);
        }
    }
    return [providerName, name, downloadOk];
});

const fetchImage = function (name, variation) {
    return Promise.all(PROVIDERS.map(provider => fetchProviderImage(provider, name, variation)));
};

const fetchEmojiImage = async(function *(name, variation = false) {
    const images = yield fetchImage(name, variation);
    const results = {};
    images.forEach(([providerName, name, ok]) => {
        results[providerName] = [name, ok];
    })
    return results;
});

console.log("Preparing filesystem".bold);
console.log("Cleaning folders...");
!DRY_RUN && rimraf.sync(ASSETS_DIR);

console.log("Creating default folders structure...");
!DRY_RUN && createDir(__dirname, "..", "assets");
!DRY_RUN && PROVIDERS.forEach(provider => createProviderFolders(provider));

console.log("Processing assets computation".bold);
const ASSETS = DICTIONNARY.reduce((dict, emoji) => {
    const { unified, variation } = emoji;
    const name = unified
    dict.push(fetchEmojiImage(name, variation));
    (emoji.skin_variations || []).forEach(unified => dict.push(fetchEmojiImage(unified)));
    return dict;
}, []);
console.log(`+ ${ASSETS.length} emojis in total.`);

console.log("Downloading assets".bold);

Promise
    .all(ASSETS)
    .then(emojis => {
        const counters = {};
        emojis.forEach(providers => {
            for (const [provider, [name, ok]] of entries(providers)) {
                if (ok) {
                    if (!counters[provider]) {
                        counters[provider] = 0;
                    }
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
