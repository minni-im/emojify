#DATABASE="https://raw.githubusercontent.com/Ranks/emojione/master/emoji.json"
DATABASE="https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji.json"
CATEGORY_DATABASE="http://www.unicode.org/emoji/charts/emoji-ordering.html"

UNICODE_EMOJI_LIST="http://www.unicode.org/emoji/charts/emoji-list.html"

echo "Retrieving datasources"
echo "+ Emoji dictionnary from iamcal/emoji-data"
curl -k -s $DATABASE -o data/emoji-source.json

node <<EOF
  "use strict";
  const fs = require("fs");
  const emojis = require("./data/emoji-source.json");
  fs.writeFileSync("./data/emoji-source.json", JSON.stringify(emojis, null, 4));
EOF

echo "+ Categories database"
curl -k -s $CATEGORY_DATABASE -o emoji-category.html
node ./scripts/category.js $@
rm emoji-category.html

echo "+ Emoji dictionnary from unicode list"
curl -k -s $UNICODE_EMOJI_LIST -o emoji-list.html
node ./scripts/dictionnary.js $@
rm emoji-list.html
