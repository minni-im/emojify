#DATABASE="https://raw.githubusercontent.com/Ranks/emojione/master/emoji.json"
DATABASE="https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji.json"
CATEGORY_DATABASE="http://www.unicode.org/emoji/charts/emoji-ordering.html"

UNICODE_EMOJI_LIST="http://www.unicode.org/emoji/charts/emoji-list.html"
UNICODE_FULL_EMOJI_LIST="http://www.unicode.org/emoji/charts/full-emoji-list.html"

echo "Retrieving datasources"
echo "+ Emoji dictionnary from iamcal/emoji-data"
curl -k -s $DATABASE -o data/emoji-source.json

node <<EOF
  "use strict";
  const fs = require("fs");
  const emojis = require("./data/emoji-source.json");
  fs.writeFileSync("./data/emoji-source.json", JSON.stringify(emojis, null, 4));
EOF

echo "+ Emoji dictionnary from unicode list"
# curl -k -s $UNICODE_EMOJI_LIST -o emoji-list.html
curl -k -s $UNICODE_FULL_EMOJI_LIST -o full-emoji-list.html

# Getting rid of all inline images (base64 png images)
sed -i -e "s/<th class='cchars'>.*<\/th>//g" full-emoji-list.html
sed -i -e "s/<td class='chars'>.*<\/td>//g" full-emoji-list.html
sed -i -e "s/<td class='andr'>.*<\/td>//g" full-emoji-list.html
sed -i -e "s/<td class='andr alt'>.*<\/td>//g" full-emoji-list.html
sed -i -e "s/<td class='andr miss'>.*<\/td>//g" full-emoji-list.html
sed -i -e "s/<td class='andr alt miss'>.*<\/td>//g" full-emoji-list.html

node ./scripts/dictionnary.js $@
# rm emoji-list.html
rm full-emoji-list.html
rm full-emoji-list.html-e

echo "+ Categories database"
curl -k -s $CATEGORY_DATABASE -o emoji-category.html
node ./scripts/category.js $@
rm emoji-category.html
