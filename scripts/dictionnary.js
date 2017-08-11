const fs = require("fs");
const { jsdom } = require("jsdom");

const DRY_RUN = process.argv.includes("--dry-run");
const GENERATE_NAME_LIST = process.argv.includes("--generate-names");

const SKIN_TONE_MODIFIERS = ["1f3fb", "1f3fc", "1f3fd", "1f3fe", "1f3ff"];

const { emoji: unicodify } = require("./utils");
const {
    BASIC: BASIC_REPLACEMENTS,
    CLOCK_MAPPING,
    KEYCAP,
    COUNTRIES
} = require("../data/replacement.json");
const EMOJI_TEXT = require("../data/emoji-text.json");

const source = fs.readFileSync("./emoji-list.html");
const document = jsdom(source);

const ROWS = document.querySelectorAll("tr");
const LIST = [];
const SHORTNAMES = [];
const BY_UNIFIED = {};

for (const row of ROWS) {
    if (row.firstElementChild.tagName === "TH") {
        continue;
    }
    const indexCell = row.children[0];
    const codeCell = row.children[1];
    const nameCell = row.children[2];
    const keywordsCell = row.children[3];

    const index = parseInt(indexCell.textContent, 10);
    const name = nameCell.childNodes[0].textContent.trim().replace("⊛ ", "");
    const keywords = keywordsCell.textContent.split(" | ");

    const unified = codeCell.querySelector("a").name.replace(/_/g, "-");

    const emoji = {
        index,
        unified,
        name,
        keywords
    };

    // ===== Variation selector 16 0xfe0f
    if (unified.includes("-fe0f")) {
        emoji.variation = unified;
        emoji.unified = unified.replace(/-fe0f/g, "");
    }
    BY_UNIFIED[emoji.unified] = emoji;

    // ===== Skin variations
    if (name.endsWith("skin tone") && !keywords.includes("skin tone")) {
        const cleanUnified = SKIN_TONE_MODIFIERS.reduce(
            (e, tone) => e.replace(`-${tone}`, ""),
            emoji.unified
        );
        const parentEmoji = BY_UNIFIED[cleanUnified];
        if (!parentEmoji) {
            console.error(`Missing emoji: ${cleanUnified} (detected from ${emoji.unified})`);
        } else {
            parentEmoji.skin_variations = (parentEmoji.skin_variations || []).concat([unified]);
        }
        continue;
    }

    // ===== Text aliases (Emoticons)
    if (EMOJI_TEXT[emoji.unified]) {
        emoji.text = [].concat(EMOJI_TEXT[emoji.unified]);
    }

    // ===== Guessing shortnames
    let shortname;
    let shortnames;

    /* Keycap numbers */
    if (/^keycap/i.test(name)) {
        const [keycap, number] = name.split(/: | /);
        shortname = KEYCAP[number.toLowerCase()];
    }

    /* Single word name */
    if (!name.includes(" ")) {
        shortname = name.toLowerCase();
    }

    /* Flags */
    if (keywords.includes("flag") && keywords.length === 1) {
        const country = COUNTRIES[emoji.unified];
        shortname = `flag-${country}`;
        shortnames = [country];
        if (!country) {
            console.error(`Misssing country name conversion: ${name}, ${unified}`);
        }
    }

    /* ZWJ, this emoji is probably a Zero Width Jointure (0x200d standard joint emojis) */
    if (emoji.unified.includes("200d") && name.includes(":")) {
        const [cat, eName] = name.split(":");
        if (eName.includes(",")) {
            shortname = eName.toLowerCase().split(", ").map(w => w.trim()).join("-");
            shortnames = [
                [cat.split(" ")[0], shortname.split("-").map(w => w[0]).join("")]
                    .join("-")
                    .toLowerCase()
            ];
        }
    }

    /* Clock */
    if (keywords.includes("clock") && keywords.length === 6) {
        shortname = `clock${CLOCK_MAPPING[name]}`;
    }

    /* We want to keep sunglasses for "smiling face with sunglasses" */
    if (unified === "1f576") {
        shortname = "dark-sunglasses";
    }

    /* Special +1 / -1 usecase */
    if (name === "thumbs-up") {
        shortnames = ["+1"];
    }
    if (name === "thumbs-down") {
        shortnames = ["-1"];
    }

    /* We prefer ti use asterisk on keycap: * */
    if (name === "eight-spoked asterisk") {
        shortname = name;
    }

    // ===== IF we don't have yet a shortname, bunch of fallbacks
    /* Shortname based on single keyword */
    if (!shortname && keywords.length === 1) {
        shortname = keywords[0].toLowerCase();
        // keywords not needed as redondant with shortname
        delete emoji.keywords;
    }

    /* Shortname based on name */
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
LIST.forEach((emoji) => {
    const { shortname } = emoji;
    let newShortname = shortname;

    /* Replacements */
    Object.keys(BASIC_REPLACEMENTS).forEach((pattern) => {
        const re = new RegExp(pattern.replace(/-/g, "\\-"), "");
        if (re.test(newShortname)) {
            newShortname = newShortname.replace(re, BASIC_REPLACEMENTS[pattern]);
        }
    });

    if (newShortname !== shortname && !SHORTNAMES.includes(newShortname)) {
        emoji.shortname = newShortname;
    }
});

if (!DRY_RUN) {
    fs.writeFileSync("./data/emoji-list.json", JSON.stringify(LIST, null, 4));
    if (GENERATE_NAME_LIST) {
        fs.writeFileSync(
            "./data/emoji-name.txt",
            `${LIST.map(e => `${unicodify(e.unified)};${e.unified};${e.shortname}`).join("\n")}`
        );
    }
}
