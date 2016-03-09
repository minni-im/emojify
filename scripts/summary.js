"use strict";
let fs = require("fs");
let glob = require("glob");
let Table = require('cli-table');

const DICT = require("../emoji.json");

let files = new Table({ head: ["Total number of files", "PNG", "SVG"] });


let e1pngs = glob.sync("./assets/emojione/png/*.png");
let e1svgs = glob.sync("./assets/emojione/svg/*.svg");
files.push({ 'EmojiOne': [e1pngs.length, e1svgs.length] });

let twitterpngs = glob.sync("./assets/twitter/png/*.png");
let twittersvgs = glob.sync("./assets/twitter/svg/*.svg");
files.push({ 'Twemoji (Twitter)': [twitterpngs.length, twittersvgs.length] });

console.log(files.toString());
