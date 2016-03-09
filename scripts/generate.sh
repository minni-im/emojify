DATABASE="https://raw.githubusercontent.com/Ranks/emojione/master/emoji.json"
echo "Retrieving Emoji dictionnary from emojiOne master repository"
curl -k -s $DATABASE -o emoji.json

node <<EOF
  "use strict";
  let fs = require("fs");
  const emojis = require("./emoji.json");
  fs.writeFileSync("emoji.json", JSON.stringify(emojis, null, 2));
EOF

function createFolders() {
  echo "Creating folders"
  mkdir assets/$1 && echo "...assets/$1"
  mkdir assets/$1/png && echo "...assets/$1/png"
  mkdir assets/$1/svg && echo "...assets/$1/svg"
  echo "  completed"
}

rm -Rf assets/*

# Get images from Ranks/emojiOne
echo "Building Emojione assets"
ZIP="emojione-master.zip"
createFolders emojione

echo "Downloading master repository from Github"
curl -s -L https://github.com/Ranks/emojione/archive/master.zip -o $ZIP
echo "  completed"

echo "Copying files..."
unzip -j -q $ZIP emojione-master/assets/png/* -d assets/emojione/png
unzip -j -q $ZIP emojione-master/assets/svg/* -d assets/emojione/svg
echo "  completed"

rm $ZIP

# Get images from twitter/twemoji
echo "Building Twitter assets"
ZIP="twemoji-master.zip"
createFolders twitter

echo "Downloading master repository from Github"
curl -s -L https://github.com/twitter/twemoji/archive/gh-pages.zip -o $ZIP
echo "  completed"

echo "Copying files..."
unzip -j -q $ZIP twemoji-gh-pages/2/72x72/* -d assets/twitter/png
unzip -j -q $ZIP twemoji-gh-pages/2/svg/* -d assets/twitter/svg
echo "  completed"

rm $ZIP
