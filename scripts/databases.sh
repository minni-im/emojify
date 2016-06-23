#DATABASE="https://raw.githubusercontent.com/Ranks/emojione/master/emoji.json"
DATABASE="https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji.json"

CATEGORY_DATABASE="http://www.unicode.org/emoji/charts/emoji-ordering.html"

echo "Retrieving datasources"
echo "+ Emoji dictionnary from iamcal/emoji-data"
curl -k -s $DATABASE -o emoji-source.json

node <<EOF
  "use strict";
  const fs = require("fs");
  const emojis = require("./emoji-source.json");
  fs.writeFileSync("emoji-source.json", JSON.stringify(emojis, null, 4));
EOF

echo "+ Categories database"
curl -k -s $CATEGORY_DATABASE -o emoji-category.html
node <<EOF
  "use strict";
  const fs = require("fs");
  const jsdom = require("jsdom").jsdom;
  const source = fs.readFileSync("./emoji-category.html");
  const categories = [];
  const document = jsdom(source);

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

  fs.writeFileSync("emoji-category.json", JSON.stringify(categories, null, 4));
EOF
rm emoji-category.html
