"use strict";
const fs = require("fs");
const path = require("path");
const color = require("colors");

const { entries, fileExists } = require("./utils");

const DICTIONNARY = require("../emoji-source.json");
const PROVIDERS = require("./providers.js");

const ASSETS_DIR = path.join(__dirname, "..", "assets");
const PROVIDERS_MASKS = {};

console.log("Building emojis info based on emoji-data dictionnary".bold);

const E_BY_UNIFIED = {};
const E_BY_SURROGATES = {};
const E_BY_ASCII = {};
const E_BY_NAMES = DICTIONNARY.reduce((dict, emoji) => {
    const name = emoji.short_name;
    const item = dict[name] = {
        unicode: [emoji.unified].concat(emoji.variations).map(u => u.toLowerCase())
    }
    if (emoji.short_names.length > 1) {
        item.alias = emoji.short_names.slice(1);
    }
    if (emoji.skin_variations) {
        // TODO: Could be optimized here with just a single boolean
        item.skin_variations = [];
        for(const [variation_name, variation] of entries(emoji.skin_variations)) {
            item.skin_variations.push(variation.unified.toLowerCase());
        }
    }

    item.category = emoji.category;

    // Checking provider image existance
    item.mask = PROVIDERS.reduce((mask, {name: providerName, type}, index) => {
        const localMask = Math.pow(2, index);
        if (fileExists(path.join(ASSETS_DIR, providerName, type, `${emoji.unified}.${type}`))) {
            mask |= localMask;
        }
        return mask;
    }, 0);

    // Building ASCII based version of the emoji
    if (emoji.text) {
        E_BY_ASCII[emoji.text] = name
    }
    if (emoji.texts) {
        emoji.texts.forEach(text => E_BY_ASCII[text] = name);
    }

    // Building secondary dictionnary, based on unified unicode, and native unified char
    item.unicode.forEach(unicode => {
        E_BY_UNIFIED[unicode] = name;
        E_BY_SURROGATES[String.fromCodePoint(...unicode.split("-").map(hex => `0x${hex}`))] = unicode;
    });
    (item.skin_variations || []).forEach((unicode, index) => {
        E_BY_UNIFIED[unicode] = `${name}::skin-tone-${index+2}`;
        E_BY_SURROGATES[String.fromCodePoint(...unicode.split("-").map(hex => `0x${hex}`))] = unicode;
    });
    return dict;
}, {});

PROVIDERS.forEach(({name}, index) => PROVIDERS_MASKS[name] = Math.pow(2, index));

console.log("Generating library file:".bold,  "lib/emojify.js");

fs.writeFileSync(
    path.join(".", "lib", "emojify.js"),
    fs.readFileSync(
        path.join(".", "scripts", "emojify.tpl.js"),
        "utf8"
    )
    // Injecting real objects;
    .replace("EMOJI_BY_NAMES", JSON.stringify(E_BY_NAMES))
    .replace("EMOJI_BY_UNICODE", JSON.stringify(E_BY_UNIFIED))
    .replace("EMOJI_BY_SURROGATES", JSON.stringify(E_BY_SURROGATES))
    .replace("EMOJI_ASCII", JSON.stringify(E_BY_ASCII))
    .replace("PROVIDERS_MASKS", JSON.stringify(PROVIDERS_MASKS))
);
