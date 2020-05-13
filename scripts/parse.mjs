import * as fs from "fs";
import * as readline from "readline";
import kleur from "kleur";

import {
	REGEX_MAPPINGS,
	TEXT_MAPPINGS,
	NAME_MAPPINGS,
	REGIONAL_INDICATORS,
	KEYCAP,
	CLOCK,
} from "./replacement.mjs";

// http://www.unicode.org/reports/tr51/#Emoji_Implementation_Notes
// By default we only generate fully-qualified emojis resources.
const TYPE_ALL = process.argv.includes("--all");

function range(start, end) {
	const length = end - start;
	return [...Array(length).keys()].map((i) => start + i);
}

async function* readByLine(source) {
	const rl = readline.createInterface({
		input: fs.createReadStream(source),
		crlfDelay: Infinity,
	});
	let group;
	let subgroup;
	for await (const line of rl) {
		if (!line || /^#/.test(line)) {
			if (/^# group:/.test(line)) {
				group = line.split(":")[1].trim();
				subgroup = undefined;
			} else if (/^# subgroup:/.test(line)) {
				subgroup = line.split(":")[1].trim();
			}
			continue;
		}

		if (group && subgroup) {
			if (
				!TYPE_ALL &&
				!line.includes("; fully-qualified") &&
				!line.includes("; component")
			) {
				continue;
			}

			yield [group, subgroup, line];
			continue;
		}
		yield line;
	}
}

function finalSort(map) {
	const dictionnary = {};
	for (const [property, codePoints] of map) {
		dictionnary[property] = [...codePoints].sort((a, b) => a - b);
	}
	return dictionnary;
}

const parseEmoji = async () => {
	const propertyMap = new Map();
	for await (const line of readByLine("./data/emoji.txt")) {
		const data = line.trim().split(" ; ");
		const charRange = data[0].replace("..", "-").trim();
		const [rangeStart, rangeEnd] = charRange
			.split("-")
			.map((r) => parseInt(r, 16));
		const property = data[1].split("#")[0].trim();

		if (rangeStart && rangeEnd) {
			for (const codePoint of range(rangeStart, rangeEnd)) {
				if (propertyMap.has(property)) {
					propertyMap.get(property).add(codePoint);
				} else {
					propertyMap.set(property, new Set([codePoint]));
				}
			}
		} else {
			const codePoint = parseInt(rangeStart, 16);
			if (propertyMap.has(property)) {
				propertyMap.get(property).add(codePoint);
			} else {
				propertyMap.set(property, new Set([codePoint]));
			}
		}
	}
	return finalSort(propertyMap);
};

const parseSequences = async (sequence) => {
	const propertyMap = new Map();
	for await (const line of readByLine(`./data/${sequence}.txt`)) {
		const data = line.trim().split("; ");
		const charRange = data[0].replace("..", "-").trim();
		const [rangeStart, rangeEnd] = charRange
			.split("-")
			.map((r) => parseInt(r, 16));
		const property = data[1].split("#")[0].trim();

		if (rangeStart && rangeEnd) {
			for (const codePoint of range(rangeStart, rangeEnd)) {
				const symbol = String.fromCodePoint(codePoint);
				if (propertyMap.has(property)) {
					propertyMap.get(property).add(symbol);
				} else {
					propertyMap.set(property, new Set([symbol]));
				}
			}
		} else {
			const codePoints = charRange
				.split(" ")
				.map((hex) => parseInt(hex, 16));
			const sequence = String.fromCodePoint(...codePoints);
			if (propertyMap.has(property)) {
				propertyMap.get(property).add(sequence);
			} else {
				propertyMap.set(property, new Set([sequence]));
			}
		}
	}
	return finalSort(propertyMap);
};

const extractCLDRName = /^(?:fully-qualified|minimally-qualified|unqualified|component)(?:\s+#[^E]+E[^\s]+)\s(.*)/u;
const VS16_HEX = "FE0F";
const ZWJ_HEX = "200D";
const SKIN_TONE_HEX = ["1F3FB", "1F3FC", "1F3FD", "1F3FE", "1F3FF"];

// Sequence Property
const BASIC_EMOJI = "Basic_Emoji";
const Emoji_Keycap_Sequence = "Emoji_Keycap_Sequence";
const RGI_Emoji_Flag_Sequence = "RGI_Emoji_Flag_Sequence";
const RGI_Emoji_Tag_Sequence = "RGI_Emoji_Tag_Sequence";
const RGI_Emoji_Modifier_Sequence = "RGI_Emoji_Modifier_Sequence";
const RGI_Emoji_ZWJ_Sequence = "RGI_Emoji_ZWJ_Sequence";

const categories = new Set();

const parseTest = async (sequences, zwjSequences) => {
	const propertyMap = {};
	for await (const [group, subgroup, line] of readByLine(
		"./data/emoji-test.txt",
	)) {
		categories.add(group);

		const data = line.split(" ; ");
		const codePoints = data[0].trim().split(" ");
		const symbol = String.fromCodePoint(
			...codePoints.map((c) => parseInt(c, 16)),
		);
		const variation = codePoints.includes(VS16_HEX);
		const zwj = zwjSequences[RGI_Emoji_ZWJ_Sequence].includes(symbol);
		const modifier =
			sequences[RGI_Emoji_Modifier_Sequence].includes(symbol) ||
			SKIN_TONE_HEX.reduce(
				(match, tone) => match || codePoints.includes(tone),
				false,
			);

		const name = extractCLDRName.exec(data[1].trim())[1];
		let shortname = name.replace(/[:,]?\s/g, "-");
		shortname = NAME_MAPPINGS[shortname] || shortname;

		function registerEmoji() {
			propertyMap[symbol] = {
				symbol,
				name,
				shortname: shortname.toLowerCase(),
				...(variation ? { variation: true } : {}),
				...(zwj ? { zwj: true } : {}),
				group,
				subgroup,
			};
		}

		// INFO: Here starts the tedious process of refining each emoji shortname
		// ======================================================================

		/* Keycap */
		if (
			sequences[Emoji_Keycap_Sequence].includes(symbol) ||
			// Special usecase for keycap: 10
			(subgroup === "keycap" && name === "keycap: 10")
		) {
			shortname = KEYCAP[name.split(":")[1].trim()];
			registerEmoji();
			continue;
		}

		/* Clock */
		if (subgroup.includes("time") && Object.keys(CLOCK).includes(name)) {
			shortname = `clock${CLOCK[name]}`;
			registerEmoji();
			continue;
		}

		/* Flags: converting shortname to countrycodes */
		if (sequences[RGI_Emoji_Flag_Sequence].includes(symbol)) {
			const countryCode = codePoints
				.map((cp) => REGIONAL_INDICATORS[cp.toLowerCase()])
				.join("");
			if (countryCode) {
				shortname = `flag-${countryCode}`;
				registerEmoji();
				continue;
			}
		}

		/* Flags: special subtag flag category: england, whales */
		if (sequences[RGI_Emoji_Tag_Sequence].includes(symbol)) {
			shortname = name.split(":")[1].trim().toLowerCase();
			registerEmoji();
			continue;
		}

		/* ZWJ: Zero Width Jointure */
		if (zwj) {
			const [category, details] = name.split(":").map((t) => t.trim());
			if (category === "family" && details) {
				shortname = `${category.replace(/\s/g, "-")}-${details
					.split(",")
					.map((d) => d.toLowerCase().trim()[0])
					.join("")}`;
			}
		}

		/* Regular Expression mappings to transform names */
		for (const [re, replacement] of REGEX_MAPPINGS) {
			if (re.test(shortname)) {
				shortname = shortname.replace(re, replacement);
			}
		}

		/* Text replacements */
		for (const [pattern, replacement] of TEXT_MAPPINGS) {
			shortname = shortname.replace(pattern, replacement);
		}

		if (!modifier) {
			registerEmoji();
			continue;
		}

		/* Skin tone (based on modifier variation) */
		const parentCodePoints = codePoints.filter(
			(c) => !SKIN_TONE_HEX.includes(c),
		);
		const parentSymbol = String.fromCodePoint(
			...parentCodePoints.map((c) => parseInt(c, 16)),
		);
		const parent = propertyMap[parentSymbol];
		if (parent) {
			parent.skin_variations = [
				...(parent.skin_variations || []),
				symbol,
			];
		}
	}
	return [categories, propertyMap];
};

async function parse() {
	console.log(kleur.bold("Parsing all emoji-data resources"));
	// console.log(kleur.gray("+ emoji.txt"), "default emoji");
	// const parsedEmoji = await parseEmoji();

	console.log(kleur.cyan("Default sequences"));
	console.log(kleur.gray(" + parsed from emoji-sequences.txt"));
	const parsedSequences = await parseSequences("emoji-sequences");
	let totalSequences = 0;
	for (const [category, sequences] of Object.entries(parsedSequences)) {
		console.log(kleur.gray(` + ${sequences.length} in ${category}`));
		totalSequences += sequences.length;
	}
	console.log("Sub-total:", totalSequences);

	console.log(kleur.cyan("ZWJ sequences (Zero-Width-Jointure)"));
	console.log(kleur.gray(" + parsed from emoji-zwj-sequences.txt"));
	const parsedZWJSequences = await parseSequences("emoji-zwj-sequences");
	const totalZWJSequences = Object.values(parsedZWJSequences).flat().length;
	console.log("Sub-total:", totalZWJSequences);

	console.log(kleur.cyan("Order, names and categories"));
	console.log(kleur.gray(" + parsed from emoji-test.txt"));
	const [categories, parsedTest] = await parseTest(
		parsedSequences,
		parsedZWJSequences,
	);

	const discoveredWithoutSkinVariations = Object.values(parsedTest).filter(
		(e) => !e.skin_variations,
	);
	const discoveredWithSkinVariations = Object.values(parsedTest).filter(
		(e) => e.skin_variations,
	);
	const discoveredWithSkinVariationsTotal = discoveredWithSkinVariations
		.map((e) => e.skin_variations)
		.flat();

	console.log(
		kleur.gray(
			` + Without skin variation: ${discoveredWithoutSkinVariations.length}`,
		),
	);
	console.log(
		kleur.gray(
			` + With skin variation: ${discoveredWithSkinVariations.length} (${discoveredWithSkinVariationsTotal.length})`,
		),
	);
	console.log(
		kleur.gray(` + ${categories.size} categorie(s):`),
		[...categories].toString(),
	);
	console.log(
		"Sub-total:",
		discoveredWithoutSkinVariations.length +
			discoveredWithSkinVariationsTotal.length,
	);

	console.log(
		kleur.bold("Total parsed:"),
		totalSequences + totalZWJSequences,
	);

	console.log(kleur.bold("Writing data dictionnaries to file-system"));
	fs.writeFileSync(
		"./data/parsed.json",
		JSON.stringify(parsedTest, null, "\t"),
	);
	console.log(kleur.gray("./data/parsed.json"));

	fs.writeFileSync(
		"./data/parsed-shortnames.json",
		JSON.stringify(
			Object.fromEntries(
				Object.values(parsedTest).map((e) => [e.symbol, e.shortname]),
			),
			null,
			"\t",
		),
	);
	console.log(kleur.gray("./data/parsed-shortnames.json"));
}

export default parse;
