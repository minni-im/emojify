jest.unmock("../emojify");

import { shortNameToUnicode, unicodeToShortName } from "../emojify";

describe("Skin variations replacer", () => {
    describe("with shortnames", () => {
        it("detects standalone skin tone varation modifier", () => {
            const text = "Ear with skin tone 6 :ear::skin-tone-6:";
            expect(shortNameToUnicode(text)).toBe("Ear with skin tone 6 👂🏿");
        });

        // it("replaces emoji with skin tone part of the name", () => {
        //     const text = "Ear with skin tone 6 :ear-tone6:";
        //     expect(shortNameToUnicode(text)).toBe("Ear with skin tone 6 👂🏿");
        // });

        it("handles multiple modifiers in a row", () => {
            // TODO: This is weird. Tones are all fucked-up
            const text = ":ear::skin-tone-6::skin-tone-6:";
            expect(shortNameToUnicode(text)).toBe("👂🏿🏿");
        });

        it("replaces multiple prefixes in a row", () => {
            const text = ":ear::ear::skin-tone-6:";
            expect(shortNameToUnicode(text)).toBe("👂👂🏿");
        });

        it("fails as expected if modifier is not contiguous", () => {
            const text = ":ok_woman: :skin-tone-4:";
            expect(shortNameToUnicode(text)).toBe("🙆 🏽");
        });
    });


    describe("with unified unicodes", () => {
        const skinTone2 = "🏻";
        const skinTone3 = "🏼";
        const skinTone4 = "🏽";
        const skinTone5 = "🏾";
        const skinTone6 = "🏿";

        it("replaces sequences correctly", () => {
            expect(unicodeToShortName(`👂${skinTone2}`)).toBe(":ear::skin-tone-2:");
            expect(unicodeToShortName(`👂${skinTone3}`)).toBe(":ear::skin-tone-3:");
            expect(unicodeToShortName(`👂${skinTone4}`)).toBe(":ear::skin-tone-4:");
            expect(unicodeToShortName(`👂${skinTone5}`)).toBe(":ear::skin-tone-5:");
            expect(unicodeToShortName(`👂${skinTone6}`)).toBe(":ear::skin-tone-6:");
        });
    });
});
