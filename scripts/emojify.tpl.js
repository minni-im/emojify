const BY_NAMES = EMOJI_BY_NAMES;
const BY_UNICODE = EMOJI_BY_UNICODE;
const ASCII_LIST = EMOJI_ASCII;

const REG_SHORTNAMES = new RegExp(RE_SHORTNAMES, "gi");
const REG_UNICODES = new RegExp(RE_UNICODES, "gi");


/**
 * Standardiztion of all unicode emojis.
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

}


/**
 * Convert all shortName emojis (such as :rocket:) to their unicode equivalent (🚀)
 * @param String some text
 * @return String some text
 */
export function shortNameToUnicode(text) {

}
