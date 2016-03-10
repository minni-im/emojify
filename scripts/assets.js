"use strict";
let fs = require("fs");
let path = require("path");
let request = require("request");
let rimraf = require("rimraf");
let color = require("colors");

const DICTIONNARY = require("../emoji-source.json");
const UNICODES = Object.keys(DICTIONNARY);
const ASSETS_DIR = path.join(__dirname, "..", "assets");

const PROVIDERS = [
  {
    name: "emojione",

    path(name, type) {
      return path.join(__dirname, "..", "assets", this.name, type, `${name}.${type}`);
    },

    png(name) {
      return `https://raw.githubusercontent.com/Ranks/emojione/master/assets/png/${name}.png`;
    },

    svg(name) {
      return `https://raw.githubusercontent.com/Ranks/emojione/master/assets/svg/${name}.svg`;
    }
  },
  {
    name: "twitter",

    path(name, type) {
      return path.join(__dirname, "..", "assets", this.name, type, `${name}.${type}`);
    },

    processName(name) {
      // Twitter is weirdly stripping leading 0...
      return name.replace(/^0+/, "");
    },

    png(name) {
      name = this.processName(name);
      return `https://raw.githubusercontent.com/twitter/twemoji/gh-pages/2/72x72/${name}.png`;
    },

    svg(name) {
      name = this.processName(name);
      return `https://raw.githubusercontent.com/twitter/twemoji/gh-pages/2/svg/${name}.svg`;
    }
  },
  {
    name: "apple",
    processName(name) {
      // Apple is also eirdly stripping leading 0...
      return name.replace(/^0+/, "");
    },
    path(name, type) {
      return path.join(__dirname, "..", "assets", this.name, type, `${name}.${type}`);
    },

    png(name) {
      name = this.processName(name);
      return `https://raw.githubusercontent.com/rodrigopolo/minEmoji/master/minEmoji_iOS8/img/${name}.png`;
    }
  },
  {
    name: "google",

    path(name, type) {
      return path.join(__dirname, "..", "assets", this.name, type, `${name}.${type}`);
    },

    png(name) {
      return `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-google-136/${name}.png`;
    }
  }
];

function log() {
  process.stdout.write.apply(process.stdout, arguments);
}

function createDir() {
  fs.mkdirSync(path.join.apply(null, arguments));
}

function createProviderFolders(provider) {
  const name = provider.name;
  createDir(__dirname, "..", "assets", name);
  createDir(__dirname, "..", "assets", name, "png");
  if (provider.svg) {
    createDir(__dirname, "..", "assets", name, "svg");
  }
}

console.log("Building Emojify Assets".bold);

console.log("Cleaning folders...");
rimraf.sync(ASSETS_DIR);

console.log("Creating default folders structure...");
createDir(__dirname, "..", "assets");
PROVIDERS.forEach(createProviderFolders);

console.log("Initializing image files fetching...");

let longuestHexUnicode = Math.max(...UNICODES.map(code => code.length));
let loaded = UNICODES.map((unicode, index) => {
  const emoji = DICTIONNARY[unicode];
  const percentage = Math.ceil(index * 100 / UNICODES.length);
  if (percentage % 10 == 0) {
    log(".");
  }

  return Promise.all(
    PROVIDERS.map(provider => {
      return new Promise((resolve) => {
        request.get({
          encoding: null,
          url: provider.png(unicode)
        }, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            fs.writeFileSync(provider.path(unicode, "png"), body);
            resolve({ provider, ok: true });
          }
          resolve({ provider, ok: false });
        });
      })
    })
  )
  .then(statuses => {
    // console.log(unicode.cyan,
    //    statuses.map(status => `${status.provider.name}: ${status.ok ? "ok".green : "ko".red}`).join(","));
  })
  .catch((ex) => {
    console.error(ex.message.red);
  });
});

console.log(" Init done.".grey);
console.log("Downloading images...");

Promise.all(loaded).then(() => {
  console.log("Download completed.");
  console.log("Assets built completed.".grey, "\n");
})
.catch(exception => {
  console.error(execption);
  process.exit(-1);
})
