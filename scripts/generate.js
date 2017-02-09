const fs = require("fs");
const path = require("path");
require("colors");

const { fileExists, emoji: nativeEmoji } = require("./utils");

// const DICTIONNARY = require("../data/emoji-source.json");
const DICTIONNARY = require("../data/emoji-list.json");
const PROVIDERS = require("../data/providers.js");

const ASSETS_DIR = path.join(__dirname, "..", "assets");
const PROVIDERS_MASKS = {};
const SKIN_TONE_MODIFIER = ["skin-tone-1-2", "skin-tone-3", "skin-tone-4", "skin-tone-5", "skin-tone-6"];

console.log("Building emojis info based on emoji-data dictionnary".bold);

const E_BY_UNIFIED = {};
const E_BY_SURROGATES = {};
const E_BY_ASCII = {};
const E_BY_NAMES = DICTIONNARY.reduce((dict, emoji) => {
    const name = emoji.shortname;
    const item = dict[name] = {
        unicode: [emoji.unified].concat(emoji.variation || [])
    };
    if (emoji.shortnames && emoji.shortnames.length > 1) {
        item.alias = emoji.shortnames;
    }
    if (emoji.skin_variations) {
        // TODO: Could be optimized here with just a single boolean
        item.skin_variations = emoji.skin_variations;
    }

    // Checking provider image existance
    item.mask = PROVIDERS.reduce((mask, { name: providerName, type }, index) => {
        const localMask = 2 ** index;
        if (fileExists(path.join(ASSETS_DIR, providerName, type, `${emoji.unified}.${type}`))) {
            mask |= localMask;
        }
        return mask;
    }, 0);

    // Building ASCII based version of the emoji
    if (emoji.text) {
        emoji.text.forEach((text) => { E_BY_ASCII[text] = name; });
    }

    // Building secondary dictionnary, based on unified unicode, and native unified char
    item.unicode.forEach((unicode) => {
        E_BY_UNIFIED[unicode] = name;
        E_BY_SURROGATES[nativeEmoji(unicode)] = unicode;
    });
    (item.skin_variations || []).forEach((unicode, index) => {
        E_BY_UNIFIED[unicode] = `${name}::${SKIN_TONE_MODIFIER[index]}`;
        E_BY_SURROGATES[nativeEmoji(unicode)] = unicode;
    });
    return dict;
}, {});

PROVIDERS.forEach(({ name }, index) => { PROVIDERS_MASKS[name] = 2 ** index; });

console.log("Generating library file:".bold, "lib/emojify.js");

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
