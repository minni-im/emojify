/* RegExp replacements */
export const REGEX_MAPPINGS = new Map(
	Object.entries({
		"\\.": "",
		"-button$": "",
		"-with-face$": "",
		"-face$": "",
		"^face-with-": "",
		"^smiling-face-with-": "",
		"^face-without": "no",
		"-monkey$": "",
		"^squared-": "",
		"^woman’s-": "",
		"-fruit": "",
		"^globe-showing": "earth",
		"beer-mug$": "beer",
		"^pile-of-poo$": "poop",
		"^p$": "parking",
		"-face-with-": "-",
		"^skin-type": "skin-tone",
		"^cold-sweat$": "sweat",
		"^artist-palette$": "art",
		"^sign-of-the-horns$": "metal",
		"^clapping-hands$": "clap",
		"^open-mouth-&-smiling-eyes$": "smile",
		"^open-mouth-&-cold-sweat$": "sweat-smile",
		"^person-": "",
		"^raising-hands$": "raised-hands",
		"heeled-shoe$": "heel",
	}).map(([pattern, replacement]) => [
		new RegExp(pattern.replace(/-/g, "\\-"), ""),
		replacement,
	]),
);

export const TEXT_MAPPINGS = new Map(
	Object.entries({
		/* In between replacements */
		"-and-": "-",
		"index-": "",
		pointing: "point",
	}),
);

/* Direct mapping replacements */
export const NAME_MAPPINGS = {
	"clinking-beer-mugs": "beers",
	"mahjong-red-dragon": "mahjong",
	"face-with-tongue": "stuck-out-tongue",
	"tears-of-joy": "joy",
	"flexed-biceps": "muscle",
	"grinning-face-with-smiling-eyes": "grin",
	"grinning-squinting": "laughing",
	"face-savouring-delicious-food": "yum",
	"heart-shaped-eyes": "heart-eyes",
	"face-blowing-a-kiss": "kissing-heart",
	"stuck-out-tongue-&-winking-eye": "stuck-out-tongue-winking-eye",
	"stuck-out-tongue-&-tightly-closed-eyes": "stuck-out-tongue-closed-eye",
	"face-screaming-in-fear": "fear",
	"red-heart": "heart",
	"white-medium-star": "star",
	"shooting-star": "stars",
	"rolling-on-the-floor-laughing": "rofl",
	"steam-from-nose": "triumph",
	thermometer: "thermometer-face",
	"front-facing-baby-chick": "hatched-chick",
	"bottle-with-popping-cork": "champagne",
	"delivery-truck": "truck",
	"sport-utility-vehicle": "sport-car",
	automobile: "car",
	"left-pointing-magnifying-glass": "magnifier",
	"right-pointing-magnifying-glass": "magnifier-right",
	"party-popper": "tada",
	"closed-mailbox-with-raised-flag": "mailbox",
	"closed-mailbox-with-lowered-flag": "mailbox-empty",
	"open-mailbox-with-raised-flag": "mailbox-with-mail",
	"open-mailbox-with-lowered-flag": "mailbox-with-no-mail",
	"ballot-box-with-ballot": "ballot-box",
};

export const KEYCAP = {
	"#": "number-sign",
	"*": "asterisk",
	"0": "zero",
	"1": "one",
	"2": "two",
	"3": "three",
	"4": "four",
	"5": "five",
	"6": "six",
	"7": "seven",
	"8": "eight",
	"9": "nine",
	"10": "ten",
};

export const CLOCK = {
	"twelve o’clock": "12",
	"twelve-thirty": "1230",
	"one o’clock": "1",
	"one-thirty": "130",
	"two o’clock": "2",
	"two-thirty": "230",
	"three o’clock": "3",
	"three-thirty": "330",
	"four o’clock": "4",
	"four-thirty": "430",
	"five o’clock": "5",
	"five-thirty": "530",
	"six o’clock": "6",
	"six-thirty": "630",
	"seven o’clock": "7",
	"seven-thirty": "730",
	"eight o’clock": "8",
	"eight-thirty": "830",
	"nine o’clock": "9",
	"nine-thirty": "930",
	"ten o’clock": "10",
	"ten-thirty": "1030",
	"eleven o’clock": "11",
	"eleven-thirty": "1130",
};

/* Use to infer country code from flag emoji
	1f1eb-1f1f7 -> 🇫🇷
	 'f' - 'r'
*/
export const REGIONAL_INDICATORS = {
	"1f1e6": "a",
	"1f1e7": "b",
	"1f1e8": "c",
	"1f1e9": "d",
	"1f1ea": "e",
	"1f1eb": "f",
	"1f1ec": "g",
	"1f1ed": "h",
	"1f1ee": "i",
	"1f1ef": "j",
	"1f1f0": "k",
	"1f1f1": "l",
	"1f1f2": "m",
	"1f1f3": "n",
	"1f1f4": "o",
	"1f1f5": "p",
	"1f1f6": "q",
	"1f1f7": "r",
	"1f1f8": "s",
	"1f1f9": "t",
	"1f1fa": "u",
	"1f1fb": "v",
	"1f1fc": "w",
	"1f1fd": "x",
	"1f1fe": "y",
	"1f1ff": "z",
};

export const EMOTICONS = {
	"2764": "<3",
	"1f435": ":o)",
	"1f48b": [":*", ":-*"],
	"1f494": "</3",
	"1f642": [":)", "(:", ":-)"],
	"1f603": ["=)", "=-)"],
	"1f604": [":D", "C:", "c:", ":-D"],
	"1f606": [":>", ":->"],
	"1f609": [";)", ";-)"],
	"1f60e": "8)",
	"1f610": [":|", ":-|"],
	"1f615": [":\\", ":-\\", ":/", ":-/"],
	"1f61b": [":p", ":-p", ":P", ":-P", ":b", ":-b"],
	"1f61c": [";p", ";-p", ";b", ";-b", ";P", ";-P"],
	"1f61e": [":(", "):", ":-("],
	"1f620": [">:(", ">:-("],
	"1f62d": ":'(",
	"1f627": "D:",
	"1f62e": [":o", ":-o", ":O", ":-O"],
};
