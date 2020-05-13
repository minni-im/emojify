import kleur from "kleur";
import fetch from "node-fetch";
import { promises as fs } from "fs";

const resources = {
	emoji: "https://unicode.org/Public/13.0.0/ucd/emoji/emoji-data.txt",
	"emoji-sequences":
		"https://unicode.org/Public/emoji/13.0/emoji-sequences.txt",
	"emoji-zwj-sequences":
		"https://unicode.org/Public/emoji/13.0/emoji-zwj-sequences.txt",
	"emoji-test": "https://unicode.org/Public/emoji/13.0/emoji-test.txt",
};

async function* getResources(resources) {
	for (let [type, url] of Object.entries(resources)) {
		console.log(kleur.gray(url));
		const content = await fetch(url).then((r) => r.text());
		yield [type, content];
	}
}

async function download() {
	console.log(kleur.bold("Downloading emoji-data resource files"));
	for await (let [type, content] of getResources(resources)) {
		await fs.writeFile(`./data/${type}.txt`, content);
	}
}

export default download;
