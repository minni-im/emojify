jest.unmock("../emojify");

import { shortNameToUnicode } from "../emojify";

describe("Shortname replacer", () => {
    it("detects single codepoint correctly", () => {
        const text = "Hello :earth_americas:, this is :rocket:";
        expect(shortNameToUnicode(text)).toBe("Hello 🌎, this is 🚀");
    });

    it("detects multi-codepoint ligatures correctly", () => {
        expect(shortNameToUnicode(":flag-fr:")).toBe("🇫🇷");

        expect(shortNameToUnicode(":six:")).toBe("6️⃣");
    });

    it("does not replace non-existant emojis", () => {
        const text = "Hi there! :doge: speaking";
        expect(shortNameToUnicode(text)).toBe(text);
    })
});
