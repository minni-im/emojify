"use strict";
const fs = require("fs");
const path = require("path");
const color = require("colors");

const { entries } = require("./utils");

const DICTIONNARY = require("../emoji-source.json");

const EMOJI_BY_NAMES = {};
const EMOJI_BY_UNICODE = {};
const EMOJI_BY_SURROGATES = {};
const EMOJI_ASCII = {};
const RE_SHORTNAMES = [];

console.log("Building emojis info based on dictionnary".bold);

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
}

console.log("Number of emojis from dictionnary:", RE_SHORTNAMES.length);

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
