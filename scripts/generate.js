"use strict";
const fs = require("fs");
const path = require("path");
const color = require("colors");

const { entries, fileExists } = require("./utils");

const DICTIONNARY = require("../emoji-source.json");
const PROVIDERS = require("./providers.js");

const ASSETS_DIR = path.join(__dirname, "..", "assets");

const EMOJI_BY_NAMES = {};
const EMOJI_BY_UNICODE = {};
const EMOJI_BY_SURROGATES = {};
const EMOJI_ASCII = {};
const PROVIDERS_MASKS = {};

console.log("Building emojis info based on dictionnary".bold);

for (const [name, emoji] of entries(DICTIONNARY)) {
    const {
        unicode,
        unicode_alternates,
        aliases_ascii,
        shortname } = emoji;

    const unicodes = unicode_alternates ? [
        unicode_alternates
    ] : [];
    unicodes.unshift(unicode);

    unicodes.forEach(code =>  {
        EMOJI_BY_UNICODE[code] = shortname;
        EMOJI_BY_SURROGATES[String.fromCodePoint(
            ...unicode
                .split("-")
                .map(hex => `0x${hex}`)
        )] = unicode;
    });

    aliases_ascii.forEach(alias => {
        EMOJI_ASCII[alias] = unicode;
    });

    let imageExists = 0;
    PROVIDERS.forEach(({name: providerName, type}, index) => {
        const mask = Math.pow(2, index);
        if (fileExists(path.join(ASSETS_DIR, providerName, type, `${unicode}.${type}`))) {
            imageExists |= mask;
        }
    });

    EMOJI_BY_NAMES[shortname] = {
        unicode: unicodes,
        mask: imageExists
    };
}

PROVIDERS.forEach(({name}, index) => PROVIDERS_MASKS[name] = Math.pow(2, index));

console.log("Generating library file:".bold,  "lib/emojify.js");
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
    .replace("PROVIDERS_MASKS", JSON.stringify(PROVIDERS_MASKS))
);
