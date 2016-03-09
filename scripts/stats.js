"use strict";
let fs = require("fs");
let path = require("path");
let glob = require("glob");
let Table = require('cli-table');

const DICT = require("../emoji.json");
let sortByLength = (a, b) => a.length < b.length;


let providers = [{
  title: "EmojiOne",
  type: "emojione"
}, {
  title: "Twemoji (Twitter)",
  type: "twitter"
}];

let listingHeader = [""];

function statsImages(provider) {
  const title = provider.title;
  const type = provider.type;
  const pngs = glob.sync(`./assets/${type}/png/*.png`);
  const svgs = glob.sync(`./assets/${type}/svg/*.svg`);

  listingHeader.push(`${title} (${pngs.length})`);

  Object.assign(provider, {
    length: pngs.length,
    unicodes: pngs.map(filepath => {
      return path.basename(filepath, ".png");
    })
  });
}

function checkImageExists(type, unicode) {
  const filepath = path.join(
    __dirname,
    "..",
    "assets",
    type,
    "png",
    `${unicode}.png`
  );
  return fs.existsSync(filepath);
}

let listing = new Table({
  head: listingHeader
});

for (let provider of providers) {
  statsImages(provider);
}

//${String.fromCodePoint(...unicode.split("-").map(code => parseInt(code, 16)))}
providers
  .sort(sortByLength)
  [0].unicodes
  .forEach(unicode => {
    listing.push([
      unicode,
      ...providers.map(provider => {
        const type = provider.type;
        return checkImageExists(type, unicode) ? "✔" : "";
      })
    ])
  });

console.log(listing.toString());
