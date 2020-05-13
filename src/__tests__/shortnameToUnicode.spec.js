import { shortnameToUnicode } from "../emojify";

describe("Shortname to unicode", () => {
	test("should not change text with no shortname", () => {
		const text = "there is no shortname in here!";
		expect(shortnameToUnicode(text)).toBe("there is no shortname in here!");
	});

	test("should detect a single shortname", () => {
		const text = "Time to go to the bathroom :toilet:";
		expect(shortnameToUnicode(text)).toBe("Time to go to the bathroom 🚽");
	});

	test("should detect a single shortname", () => {
		const text = "Time to go to the bathroom :toilet:";
		expect(shortnameToUnicode(text)).toBe("Time to go to the bathroom 🚽");
	});

	test("should detect multiple shortnames", () => {
		const text = "Hello :earth-americas:, this is :dog-face:";
		expect(shortnameToUnicode(text)).toBe("Hello 🌎, this is 🐶");
	});
});

describe("Specific shortnames", () => {
	test("should be generated for animals faces", () => {
		expect(shortnameToUnicode(":monkey-face: :monkey:")).toBe("🐵 🐒");
		expect(shortnameToUnicode(":dog-face: :dog:")).toBe("🐶 🐕");
		expect(shortnameToUnicode(":cat-face: :cat:")).toBe("🐱 🐈");
		expect(shortnameToUnicode(":tiger-face: :tiger:")).toBe("🐯 🐅");
		expect(shortnameToUnicode(":horse-face: :horse:")).toBe("🐴 🐎");
		expect(shortnameToUnicode(":cow-face: :cow:")).toBe("🐮 🐄");
		expect(shortnameToUnicode(":pig-face: :pig:")).toBe("🐷 🐖");
		expect(shortnameToUnicode(":mouse-face: :mouse:")).toBe("🐭 🐁");
		expect(shortnameToUnicode(":rabbit-face: :rabbit:")).toBe("🐰 🐇");
		expect(shortnameToUnicode(":dragon-face: :dragon:")).toBe("🐲 🐉");
	});
});
