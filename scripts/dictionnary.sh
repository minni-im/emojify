DATABASE="https://raw.githubusercontent.com/Ranks/emojione/master/emoji.json"
echo "Retrieving Emoji dictionnary from emojiOne master repository"
curl -k -s $DATABASE -o emoji-source.json

node <<EOF
  "use strict";
  let fs = require("fs");
  const emojis = require("./emoji-source.json");
  fs.writeFileSync("emoji-source.json", JSON.stringify(emojis, null, 2));
EOF

echo ""
