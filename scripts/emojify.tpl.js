/* Utility methods */
const escape_regexp = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

/* Main data objects */
const BY_NAMES = EMOJI_BY_NAMES;
const BY_UNICODE = EMOJI_BY_UNICODE;
const ASCII_LIST = EMOJI_ASCII;
const MASK_BY_PROVIDER = PROVIDERS_MASKS;

const REGEXP_COLONS = new RegExp("\:([a-zA-Z0-9-_+]+)\:(\:skin-tone-([2-6])\:)?", "g");

const SURROGATES = Object.keys(BY_UNICODE)
    .map(unicode => unicode.split("-").map(hex => `\\x${hex}`).join(""))
    .sort((a, b) => b.length - a.length);

const REGEXP_SURROGATES = new RegExp(`(${SURROGATES.join("|")})`, "ug");

export const ALL = BY_NAMES;

/**
 * Standardiztion of a sll unicode emojis.
 * We first transform all of them to shortNames, and then convert them back
 * to unicode.
 * @param String some text
 * @return String some text
 */
export function unifyUnicode(text) {
    text = unicodeToShortName(text);
    text = shortNameToUnicode(text);
    return text;
}

/**
 * Convert shortName emojis (such as :wink:) to their ascii equivalent ( ;^) )
 * Could be used on system that don't support unicode
 * @param String some text
 * @return String some text
 */
export function shortNameToAscii(text) {

}

/**
 * Convert all unicode empjis (such as 🚽) to their shortNames equivalent (:toilet:)
 * @param String some text
 * @return String some text
 */
export function unicodeToShortName(text) {
    return text.replace(REGEXP_SURROGATES, (match) => {
        console.log("found", match);
        return match;
    });
}

/**
 * Convert all shortName emojis (such as :rocket:) to their unicode equivalent (🚀)
 * @param String some text
 * @return String some text
 */
export function shortNameToUnicode(text) {
    return text.replace(REGEXP_COLONS, (match, name, skinTone, toneLevel) => {
        let emoji = BY_NAMES[`:${name}:`];
        if (skinTone) {
            toneLevel = parseInt(toneLevel, 10) - 1;
            emoji = BY_NAMES[`:${name}_tone${toneLevel}:`];
        }
        if (!emoji) {
            return match;
        }
        return String.fromCodePoint(...emoji.unicode[0].split("-").map(u => parseInt(u, 16)));
    });
}
