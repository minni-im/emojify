"use strict";
const fs = require("fs");
const jsdom = require("jsdom").jsdom;
const source = fs.readFileSync("./emoji-category.html");
const categories = [];
const document = jsdom(source);

const DRY_RUN = process.argv.includes("--dry-run");

const rows = document.querySelectorAll("tr");
let current;
for (const row of rows) {
    const container = row.firstElementChild;

    switch (container.className) {
        case "bighead":
            const title = container.querySelector("a").textContent;
            current = { title, emojis: [] };
            categories.push(current);
            break;
        case "lchars":
            const emojis = container.querySelectorAll("a");
            current.emojis = [
                ...current.emojis,
                ...[...emojis].map(emoji => emoji.firstElementChild.getAttribute("alt"))
            ];
            break;
      }
}

if (!DRY_RUN) {
    fs.writeFileSync("./data/emoji-category.json", JSON.stringify(categories, null, 4));
}
