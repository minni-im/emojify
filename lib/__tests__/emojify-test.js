jest.unmock("../emojify");

const { extractEmoji, containsEmoji } = require("../emojify");

describe("Emojify", () => {
    it("should detect emojis if any, of any types", () => {
        expect(containsEmoji("There is no emoji")).toBe(false);
        expect(containsEmoji("Hello :rocket: !")).toBe(true);
        expect(containsEmoji("What a 🌤 day. There is no :umbrella-with-rain-drops:")).toBe(true);
    });

    it("should extract related emoji information if any", () => {
        expect(extractEmoji("There is no emoji !")).toBe(null);

        expect(extractEmoji("Hello :rocket: !")).toEqual({
            rocket: {
                unicode: "1f680",
                indices: [6, 14]
            }
        });
        expect(extractEmoji("Hello 🚀 !")).toEqual({
            rocket: {
                unicode: "1f680",
                indices: [6, 8]
            }
        });


        const info = extractEmoji("What a 🌤 day. There is no :umbrella-with-rain-drops:");

        expect(info).toEqual(jasmine.objectContaining({
            "sun-behind-small-cloud": {
                unicode: "1f324",
                indices: [7,9]
            }
        }));
        expect(info).toEqual(jasmine.objectContaining({
            "umbrella-with-rain-drops": {
                unicode: "2614",
                indices: [27, 53]
            }
        }));
    });

    it("should extract emoji from shortname with skin tone variation modifier", () => {
        const info = extractEmoji("ho ho ho! :santa-claus::skin-tone-6:");
        expect(info).toEqual({
            "santa-claus": {
                unicode: "1f385",
                indices: [10, 36],
                skin_variation: {
                    shortname: "skin-tone-6",
                    unicode: "1f385-1f3ff"
                }
            }
        });
    });


    it("should extract emoji info from unicode with skin tone variation modifier", () => {
        expect(extractEmoji("Ho ho ho! 🎅🏿")).toEqual({
            "santa-claus": {
                unicode: "1f385",
                indices: [10, 14],
                skin_variation: {
                    shortname: "skin-tone-6",
                    unicode: "1f385-1f3ff"
                }
            }
        });
    })
})
