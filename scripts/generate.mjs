import kleur from "kleur";
import * as fs from "fs";

import EMOJIS from "../data/parsed.json";
import SHORTNAMES from "../data/parsed-shortnames.json";
import { EMOTICONS } from "./replacement.mjs";

const template = fs.readFileSync("./scripts/template/emojify.js").toString();

export default async function generate() {
	const GROUPS = new Map();
	Object.values(EMOJIS).forEach(({ group }, index) => {
		if (!GROUPS.has(group)) {
			GROUPS.set(group, index);
		}
	});

	console.log(kleur.bold("Writing emojify library to 'src/' folder"));
	fs.writeFileSync(
		"./src/emojify.js",
		template
			.replace("process.env.EMOJIS", JSON.stringify(SHORTNAMES))
			.replace("process.env.EMOTICONS", JSON.stringify(EMOTICONS))
			.replace(
				"process.env.GROUPS",
				JSON.stringify(Array.from(GROUPS.entries()).flat()),
			),
	);
}
