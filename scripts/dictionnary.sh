DATABASE="https://raw.githubusercontent.com/Ranks/emoji-alpha-codes/master/eac.json"
echo "Retrieving Emoji dictionnary from emojiOne master repository"
curl -k -s $DATABASE -o emoji-source.json
echo ""
