"use strict";
let fs = require("fs");
let path = require("path");
let request = require("request");
let rimraf = require("rimraf");
let color = require("colors");

const DICTIONNARY = require("../emoji-source.json");
const ASSETS_DIR = path.join(__dirname, "..", "assets");

function createDir() {
    fs.mkdirSync(path.join.apply(null, arguments));
}

function createProviderFolders(provider) {
    createDir(__dirname, "..", "assets", provider);
}

function async(makeGenerator) {
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
                error ||
                (response.statusCode === 404 && new Error(`Error 404 '${url}'`))
            );
        })
    })
}

const requestImages = async(function* (name, variation) {
    let emojione;
    try {
        emojione = yield getImage(`https://raw.githubusercontent.com/Ranks/emojione/master/assets/svg/${name}.svg`);
    } catch (ex) {
        console.warn("Warning".yellow.bold, name.cyan, ex.message);
        emojione = false;
    }

    let twitter;
    try {
        // Twitter is weirdly stripping leading 0...
        const twitterName = name.replace(/^0+/, "");
        twitter = yield getImage(`https://raw.githubusercontent.com/twitter/twemoji/gh-pages/2/svg/${twitterName}.svg`);
    } catch(ex) {
        twitter = false;
        if (variation) {
            try {
                twitter = yield getImage(`https://raw.githubusercontent.com/twitter/twemoji/gh-pages/2/svg/${variation}.svg`);
            } catch(ex) {
                console.warn("Warning".yellow.bold, name.cyan, ex.message);
            }
        } else {
            console.warn("Warning".yellow.bold, name.cyan, "No emoji for Twitter");
        }
    }

    let apple;
    try {
        apple = yield getImage(`https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/${name}.png`)
    } catch(ex) {
        apple = false;
        if (variation) {
            try {
                apple = yield getImage(`https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/${variation}.png`);
            } catch(ex) {
                console.warn("Warning".yellow.bold, name.cyan, ex.message);
            }
        } else {
            console.warn("Warning".yellow.bold, name.cyan, "No emoji for Apple");
        }
    }

    return {
        emojione: [`${name}.svg`, emojione],
        twitter: [`${name}.svg`, twitter],
        apple: [`${name}.png`, apple]
    };
});

function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

const EMOJI_BY_NAMES = {};
const EMOJI_BY_UNICODE = {};
const EMOJI_BY_SURROGATES = {};
const EMOJI_ASCII = {};
const RE_SHORTNAMES = [];

const assets = [];

console.log("Preparing filesystem".bold);
console.log("Cleaning folders...");
rimraf.sync(ASSETS_DIR);

console.log("Creating default folders structure...");
createDir(__dirname, "..", "assets");
createProviderFolders("emojione");
createProviderFolders("twitter");
createProviderFolders("apple");

console.log("Processing assets computation".bold);

for (const [name, emoji, images] of entries(DICTIONNARY)) {
    const shortName = name.replace(/:/g, "");
    const unicodes = emoji.unicode_alternates ? [
        emoji.unicode_alternates
    ] : [];
    unicodes.push(emoji.unicode);

    EMOJI_BY_NAMES[shortName] = {
        unicode: unicodes
    }
    unicodes.forEach(unicode =>  {
        EMOJI_BY_UNICODE[unicode] = shortName;
        EMOJI_BY_SURROGATES[String.fromCodePoint(
            ...unicode
                .split("-")
                .map(hex => `0x${hex}`)
        )] = unicode;
    });
    RE_SHORTNAMES.push(shortName);

    emoji.aliases_ascii.forEach(alias => {
        EMOJI_ASCII[alias] = emoji.unicode;
    });

    assets.push(requestImages(emoji.unicode, emoji.unicode_alternates));
}

console.log("Number of emojis from dictionnary:", RE_SHORTNAMES.length);

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

Promise.all(assets)
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

        console.log(`Assets download complete`);

        for(const [provider, counter] of entries(counters)) {
            console.log(`${provider}:`, `${counter}`.grey);
        }

        console.log("Generating library file:".bold,  "emojify.js");
        fs.writeFileSync(
            path.join(".", "lib", "emojify.js"),
            fs.readFileSync(
                path.join(".", "scripts", "emojify.tpl.js"),
                "utf8"
            )
            // Injecting real objects;
            .replace("EMOJI_BY_NAMES", JSON.stringify(EMOJI_BY_NAMES))
            .replace("EMOJI_BY_UNICODE", JSON.stringify(EMOJI_BY_UNICODE))
            .replace("EMOJI_BY_SURROGATES", JSON.stringify(EMOJI_BY_SURROGATES))
            .replace("EMOJI_ASCII", JSON.stringify(EMOJI_ASCII))
            .replace("RE_SHORTNAMES", RE_SHORTNAMES.join("|"))
        );
    })
    .catch(error => {
        console.error("Error".red.bold, error);
    });
