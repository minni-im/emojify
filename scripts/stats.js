"use strict";
let fs = require("fs");
let path = require("path");
let glob = require("glob");
let color = require("colors");
let Table = require('cli-table');

const DICT = require("../emoji.json");
let sortByLength = (a, b) => a.length < b.length;

console.log("Emojify Statistics".bold);

let providers = [{
  title: "EmojiOne",
  type: "emojione"
}, {
  title: "Twemoji (Twitter)",
  type: "twitter"
}];

let listingHeader = [""];


function normalizeUnicode4Digts(unicode) {
  let splits = unicode.split("-");
  return splits
    .map(code => {
      switch (code.length) {
        case 2:
          return "00" + code;
        case 3:
          return "0" + code;
      }
      return code;
    })
    .join("-");
}

function statsImages(provider) {
  const title = provider.title;
  const type = provider.type;
  const pngs = glob.sync(`./assets/${type}/png/*.png`);
  const svgs = glob.sync(`./assets/${type}/svg/*.svg`);

  Object.assign(provider, {
    length: pngs.length,
    unicodes: pngs.map(filepath => {
      return path.basename(filepath, ".png");
    })
  });
}

function checkImageExists(type, unicode, normalized) {
  const filepath = name => {
    return path.join(
      __dirname,
      "..",
      "assets",
      type,
      "png",
      `${name}.png`);
  };
  if (normalized !== unicode) {
    return fs.existsSync(filepath(normalized)) || fs.existsSync(filepath(unicode));
  }
  return fs.existsSync(filepath(unicode));
}

for (let provider of providers) {
  statsImages(provider);
}

//${String.fromCodePoint(...unicode.split("-").map(code => parseInt(code, 16)))}
providers
  .sort(sortByLength)
  .forEach(provider => {
    listingHeader.push(`${provider.title} (${provider.length})`);
  });

let listing = new Table({
  head: listingHeader
});

const biggerList = providers[0]
biggerList.unicodes
  .forEach(unicode => {
    const normalized = normalizeUnicode4Digts(unicode);
    const status = providers.map(provider => {
      const type = provider.type;
      return checkImageExists(type, unicode, normalized) ? "✔" : "";
    });

    if (status.join("").length !== providers.length) {
      listing.push([
        unicode !== normalized ? `${unicode} / ${normalized}` : unicode,
        ...status
      ]);
    }
  });

// console.log(listing.toString());
// console.log(`${listing.length} differences were found between providers`);


let unicodes = Object.keys(DICT)
console.log(`${unicodes.length} emojis from dictionnary`);
let differences = [];

unicodes.forEach(unicode => {
  const emojione = checkImageExists("emojione", unicode, unicode);
  const twitter = checkImageExists("twitter", unicode, unicode);
  if (emojione !== twitter) {
    differences.push(unicode);
  }
})

console.log(`${differences.length.toString().inverse.red} differences detected.`);
