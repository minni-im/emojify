import { unicodeToShortname } from "../emojify";

describe("Unicode to Shortname", () => {
	test("should not change text with no emoji", () => {
		const text = "Let's go to the moon";
		expect(unicodeToShortname(text)).toBe(text);
	});

	test("should convert text with single emoji", () => {
		const text = "Let's go to the moon using this 🚀";

		expect(unicodeToShortname(text)).toBe(
			"Let's go to the moon using this :rocket:",
		);
	});

	test("should convert text with several emojis", () => {
		const text = "I think I need food like 🍔🍟🍺";

		expect(unicodeToShortname(text)).toBe(
			"I think I need food like :hamburger: :french-fries: :beer:",
		);
	});

	test("should replace flag", () => {
		expect(unicodeToShortname("\u{1F1EB}\u{1F1F7}")).toBe(":flag-fr:");
		expect(unicodeToShortname("France 🇫🇷")).toBe("France :flag-fr:");
	});
});
