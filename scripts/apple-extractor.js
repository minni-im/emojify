require("colors");
const fontkit = require("fontkit");
const fs = require("fs");
const rimraf = require("rimraf");

const { createDir, unifiedToUnicode } = require("./utils");

const collectionPath = "/System/Library/Fonts/Apple Color Emoji.ttc"; // >= OS X 10.12

function getFont() {
    if (fs.existsSync(collectionPath)) {
        return fontkit.openSync(collectionPath).fonts[0];
    }

    console.log(`${"Error".red}: Could not find the emoji font`);
    return null;
}

rimraf.sync(`${__dirname}/../assets/apple/png/`);
createDir(__dirname, "..", "assets", "apple", "png");

const font = getFont();
if (font) {
    for (let i = 0; i < font.numGlyphs; i++) {
        const glyph = font.getGlyph(i);
        const strings = font.stringsForGlyph(i);
        const image = glyph.getImageForSize(160);

        if (image && strings.length > 0) {
            // Remove variation selectors from image file names.
            const strs = new Set(strings.map(s => s.replace(/[\ufe00-\ufe0f\u200d]/g, "")));
            for (const s of strs) {
                const name = unifiedToUnicode(s);
                fs.writeFileSync(`${__dirname}/../assets/apple/png/${name}.png`, image.data);
            }
        }
    }
}
