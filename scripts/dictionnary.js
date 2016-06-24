"use strict";
const fs = require("fs");
const jsdom = require("jsdom").jsdom;

const { emoji: unicodify } = require("./utils");

const source = fs.readFileSync("./emoji-list.html");
const document = jsdom(source);

const ROWS = document.querySelectorAll("tr");
const LIST = [];
const SHORTNAMES = [];
const BY_UNIFIED = {};

for(const row of ROWS) {
    if (row.firstElementChild.tagName === "TH") {
        continue;
    }
    const indexCell = row.children[0];
    const codeCell = row.children[1];
    const browserImgCell = row.children[2];
    const sampleImgCell = row.children[3];
    const nameCell = row.children[4];
    const keywordsCell = row.children[5];

    const index = parseInt(indexCell.textContent,10);
    const unified = codeCell.querySelector("a").name.replace(/_/g, "-");
    const keywords = keywordsCell.textContent.split(",").map(t => t.trim());

    const name = nameCell.childNodes[0].textContent.trim();
    const alias = nameCell.childNodes[2] && nameCell.childNodes[2].textContent.trim();

    const emoji = { index, unified, name, keywords };
    BY_UNIFIED[unified] = emoji;

    // ===== Variation selector 16 0xfe0f
    if (unified.includes("-fe0f")) {
        emoji.variation = unified;
        emoji.unified = unified.replace(/\-fe0f/g, "");
    }

    // ===== Skin variations
    if (name.includes(", type-")) {
        const parentEmoji = BY_UNIFIED[unified.split("-")[0]];
        parentEmoji.skin_variations = (parentEmoji.skin_variations || []).concat([unified])
        continue;
    }

    // ===== Guessing shortnames
    let shortname, shortnames;
    /* Keycap numbers */
    if ((/^Keycap/i).test(name)) {
        const [ keycap, type, number] = name.split(" ");
        if (type === "DIGIT") {
            shortname = number.toLowerCase();
        } else if (type === "NUMBER") {
            shortname = [type, number].join("-").toLowerCase();
        } else {
            shortname = type.toLowerCase();
        }
    }

    /* Flags */
    if (name.includes("REGIONAL INDICATOR SYMBOL")) {
        const country = name.replace(/(REGIONAL INDICATOR SYMBOL LETTER|,)/g, "")
            .split(" ")
            .join("")
            .toLowerCase();
        shortname = country;
        shortnames = [ `flag-${country}` ];
    }

    /* Single word name */
    if (!name.includes(" ")) {
        shortname = name.toLowerCase();
    }

    /* ZWJ, this emoji is probably a Zero Width Jointure (0x200d standard joint emojis) */
    if (name.includes(":")) {
        const [ cat, eName ] = name.split(":");
        shortname = eName.toLowerCase()
            .split(",")
            .map(w => w.trim())
            .join("-");
        shortnames = [
            [
                cat.split(" ")[0],
                shortname.split("-").map(w => w[0]).join("")
            ].join("-").toLowerCase()
        ];
    }

    /* Alias present in name ≊ */
    if (!shortname && alias && alias.includes("≊")) {
        shortname = alias.substr(2).replace(/ /g, "-");
    }

    /* Fallback, shortname based on name */
    if (!shortname && name.includes(" ")) {
        shortname = name.replace(/ /g, "-").toLowerCase();
    }

    // ===== We are done, moving on to next emoji
    SHORTNAMES.push(shortname);
    emoji.shortname = shortname;
    if (shortnames) {
        emoji.shortnames = shortnames;
    }
    LIST.push(emoji);
}


// Second pass to filter things out a bit more precisely
const REPLACEMENTS = {
    "-button$": "",
    "-with-face$": "",
    "-face$": "",
    "^face-with-": "",
    "^smiling-face-with-": "",
    "^squared-": "",
    "^globe-showing": "earth",
    "^open-mouth$": "smiley",
    "^open-mouth-and-smiling-eyes$": "smile",
    "beer-mug": "beer",
    "clinking-beer-mugs": "beers"
};

LIST.forEach(emoji => {
    const { shortname } = emoji;
    let newShortname = shortname;

    /* Replacements */
    Object.keys(REPLACEMENTS).forEach(pattern => {
        const re = new RegExp(pattern.replace(/\-/g, "\\-"), "");
        if (re.test(newShortname)) {
            newShortname = newShortname.replace(re, REPLACEMENTS[pattern]);
        }
    });

    if (newShortname !== shortname && !SHORTNAMES.includes(newShortname)) {
        emoji.shortname = newShortname;
    }
});

fs.writeFileSync("emoji-list.json", JSON.stringify(LIST, null, 4));

fs.writeFileSync("emoji-name.json", JSON.stringify(LIST.map(e => {}), null, 4));

LIST.forEach(emoji => {
    console.log(
        unicodify(emoji.unified),
        "\t\t",
        emoji.shortname || "",
        emoji.skin_variations ? "(skin)" : "",
        "\t\t",
        !emoji.shortname ? emoji.name : ""
    );
});
