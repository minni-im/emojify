/* Utility methods */
const escapeRegexp = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

const unicodeToUnified = unicode =>
    String.fromCodePoint(...unicode.split("-").map(hex => parseInt(hex, 16)));

const unifiedToUnicode = unified => {
    const codepoints = [];
    for(const char of unified) {
        codepoints.push(char.codePointAt(0).toString(16))
    }
    return codepoints.join("-");
}

/* Main data objects */
const BY_NAMES = EMOJI_BY_NAMES;
const BY_UNICODE = EMOJI_BY_UNICODE;
const ASCII_LIST = EMOJI_ASCII;
const MASK_BY_PROVIDER = PROVIDERS_MASKS;
const SKIN_TONE_MODIFIERS = [0, 0, "1f3fb", "1f3fc", "1f3fd", "1f3fe", "1f3ff"];

const REGEXP_COLONS = new RegExp("\:([a-zA-Z0-9-_+]+)\:(\:skin-tone-([2-6])\:)?", "g");

let variations = [];
const SURROGATES = Object.keys(BY_UNICODE)
    .map(unicode => unicodeToUnified(unicode))
    .map(unified => unified.replace('*', '\\*'))
    .sort((a, b) => b.length - a.length);

const REGEXP_SURROGATES = new RegExp(`(${SURROGATES.join("|")})`, "ug");

const ASCII_LIST_ESCAPED = {};
const ASCII = Object.keys(ASCII_LIST)
    .map(emoticon => {
        const escaped = emoticon.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
        if (!ASCII_LIST_ESCAPED[escaped]) {
            ASCII_LIST_ESCAPED[escaped] = ASCII_LIST[emoticon];
        }
        return escaped;
    })
    .map(emoticon => escapeRegexp(emoticon));
const REGEXP_ASCII = new RegExp(`(^|\\s)(${ASCII.join("|")})(?=$|[\\s|\\?\\.,!])`, "g");

const reverseMap = (map, mapValue = v => v, mapKey = k => k) =>
    Object.keys(map)
        .reduce((acc, key) => {
            const newKey = mapValue(map[key]);
            acc[newKey] = (acc[newKey] || []).concat(mapKey(key));
            return acc;
        }, {});
const SHORT_TO_ASCII = reverseMap(ASCII_LIST);

/* Managing shortnames alias */


/* Public API */
export const ALL = BY_NAMES;

/**
 * Standardiztion of all unicode emojis.
 * We first transform all of them to shortNames, and then convert them back
 * to unicode.
 * @param String some text
 * @return String normalized text
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
 * @return String converted text
 */
export function shortNameToAscii(text) {
    return text.replace(REGEXP_COLONS,
        (match, name, skinTone, toneLevel) => (
            (SHORT_TO_ASCII[name] && SHORT_TO_ASCII[name][0])
            || `:${name}:`
        ));
}

/**
 * Convert ascii emoticons to their emoji shortnames equivalent
 * @param String some text
 * @return String converted text
 */
export function asciiToShortName(text) {
    const withParens = [];
    let start = 0;
    let replacement = text.replace(REGEXP_ASCII, (match, before, emoticon, offset) => {
        const emoji = ASCII_LIST_ESCAPED[emoticon];
        if (!emoji) {
            return match;
        }
        const openParen = emoticon.includes("(");
        const closeParen = emoticon.includes(")");

        if ((openParen || closeParen) && !withParens.includes(emoticon)) {
            withParens.push(emoticon);
        }

        // Let's check eventual meaningful parentethis, such as in "Let's meet tonight (around 7 - 8)"
        if(closeParen && !openParen) {
            const extract = text.substring(start, offset);
            start = offset + match.length;
            if (extract.includes("(") && !extract.includes(")")) {
                return match;
            }
        }

        return before + `:${emoji}:`;
    });

    // Here we must handle emoticons that were detected inside parentethis
    if (withParens.length) {
        const PARENS_REGEXP = new RegExp(`(\\(.+)(${withParens.map(escapeRegexp).join("|")})(.+\\))`, "g");
        replacement =
            replacement.replace(PARENS_REGEXP,
                (match, before, emoticon, after) => {
                    console.log(match, before, emoticon, after);
                    const emoji = BY_UNICODE[ASCII_LIST[emoticon]];
                    if (!emoji) {
                        return match;
                    }
                    return  before + emoji + after;
                });
    }

    return replacement;
}

/**
 * Convert all unicode empjis (such as 🚽) to their shortNames equivalent (:toilet:)
 * @param String some text
 * @return String converted text
 */
export function unicodeToShortName(text) {
    return text.replace(REGEXP_SURROGATES, match => {
        return `:${BY_UNICODE[unifiedToUnicode(match)]}:` || match
    });
}

/**
 * Convert all shortName emojis (such as :rocket:) to their unicode equivalent (🚀)
 * @param String some text
 * @return String converted text
 */
export function shortNameToUnicode(text) {
    return text.replace(REGEXP_COLONS, (match, name, skinTone, toneLevel) => {
        let emoji = BY_NAMES[name];
        if (skinTone) {
            toneLevel = parseInt(toneLevel, 10);
            emoji = BY_NAMES[name].skin_variations[toneLevel - 2];
            return emoji ? unicodeToUnified(emoji) : match;
        }
        if (!emoji) {
            return match;
        }
        return unicodeToUnified(emoji.unicode[1] || emoji.unicode[0]);
    });
}

/**
 * Return a boolean value depending if text contains or not some emojis
 * @param String some text
 * @return Boolean
 */
export function containsEmoji(text) {
    return extractEmoji(text) !== null;
}

/**
 * Extract all emoji related information.
 * It will detect 3 kind of emojis/emoticons:
 * - Unified emojis: native emojis 🚽,👌,🦄
 * - Shortnames emojis: :poop:, :fries:, :zap:
 * - Ascii emoticons: :'), >=), X-P
 * @param String some text
 * @return Object structural information regarding detected emojis
 */
export function extractEmoji(text) {
    return null;
}
