import { unicodeToShortName } from "../emojify";

describe("Unicode replacer", () => {
    it("replaces single codepoint correctly", () => {
        const text = "Today the weather is cloudy ☁";
        expect(unicodeToShortName(text)).toBe("Today the weather is cloudy :cloud:");

        expect(unicodeToShortName("Partially cloudy 🌤")).toBe("Partially cloudy :sun-behind-small-cloud:");
    });

    it("replaces multi-codepoint ligatures correctly", () => {
        expect(unicodeToShortName("🇫🇷")).toBe(":fr:");
    });

    it("should not detect invalid multi-codepoint ligatures", () => {
        expect(unicodeToShortName("🇫🇫")).toBe("🇫🇫");
    });
});
