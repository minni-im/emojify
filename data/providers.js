module.exports = [
    {
        name: "emojione",
        type: "svg",
        url(name) {
            name = name
                // zero width jointure (zwj) are not present of filename
                .replace(/\-200d/g, "")
                // variation selector 16 are also removed from filename
                .replace(/\-fe0f/g, "");
            return `https://raw.githubusercontent.com/Ranks/emojione/master/assets/svg/${name}.svg`;
        }
    },
    // {
    //     name: "apple",
    //     type: "png",
    //     url(name) {
    //         return `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/${name}.png`;
    //     }
    // },
    {
        name: "twitter",
        type: "svg",
        preProcessName(name) {
            // Twitter is weirdly stripping leading 0...
            return name.replace(/^0+/, "");
        },
        url(name) {
            return `https://raw.githubusercontent.com/twitter/twemoji/gh-pages/2/svg/${name}.svg`;
        }
    }
];
