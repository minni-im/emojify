module.exports = [
    {
        name: "emojione",
        type: "svg",
        url(name) {
            return `https://raw.githubusercontent.com/Ranks/emojione/master/assets/svg/${name}.svg`
        }
    },
    {
        name: "apple",
        type: "png",
        url(name) {
            return `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/${name}.png`
        }
    },
    {
        name: "twitter",
        type: "svg",
        preProcessName(name) {
            // Twitter is weirdly stripping leading 0...
            return name.replace(/^0+/, "");
        },
        url(name) {
            return `https://raw.githubusercontent.com/twitter/twemoji/gh-pages/2/svg/${name}.svg`
        }
    }
];
