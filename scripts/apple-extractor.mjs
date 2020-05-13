import * as kleur from "kleur";
import fontkit from "fontkit";
import * as fs from "fs";

const collectionPath = "/System/Library/Fonts/Apple Color Emoji.ttc"; // >= OS X 10.12

function getFont() {
	if (fs.existsSync(collectionPath)) {
		return fontkit.openSync(collectionPath).fonts[0];
	}
	console.log(`${kleur.red("Error")}: Could not find the emoji font`);
	return null;
}

const font = getFont();
if (font) {
	for (let i = 0; i < font.numGlyphs; i++) {
		const glyph = font.getGlyph(i);
		const strings = font.stringsForGlyph(i);
		const image = glyph.getImageForSize(160);
		if (image && strings.length > 0) {
			// Remove variation selectors from image file names.
			const strs = new Set(
				strings.map((s) => s.replace(/[\ufe00-\ufe0f\u200d]/g, "")),
			);
			for (const s of strs) {
				const name = [...s].map((c) => c.codePointAt(0)).join("-");
				fs.writeFileSync(`./assets/apple/png/${name}.png`, image.data);
			}
		}
	}
}
