import * as emojify from "../emojify";

describe("Emojify public API", () => {
	test.each([
		"unifyUnicode",
		"unicodeToShortname",
		"shortnameToUnicode",
		"test",
		"parse",
	])("should have a '%s' method", (method) =>
		expect(emojify[method]).toBeDefined(),
	);
});

test("should detect emojis if any, of any types", () => {
	expect(emojify.test("There is no emoji here.")).toBe(false);
	expect(emojify.test("Hello :unicorn: !")).toBe(true);
	expect(emojify.test("Hello 👋!")).toBe(true);
	expect(
		emojify.test(
			"What a 🌤 day! I thought it would :cloud-with-rain: today",
		),
	).toBe(true);
});

test("should unify emoji unicodes and shortnames", () => {
	expect(emojify.unifyUnicode("🥽")).toBe("🥽");
	expect(emojify.unifyUnicode(":hamburger: 🍔")).toBe("🍔 🍔");
	expect(emojify.unifyUnicode(":french-fries: :pizza: :hot-dog:")).toBe(
		"🍟 🍕 🌭",
	);
});

describe("Emojify.parse()", () => {
	test("should return null if no emoji is discovered", () => {
		expect(emojify.parse("There is no emoji in here!")).toBe(null);
	});

	test("should discover single shortname", () => {
		const entities = emojify.parse("Hungry :hamburger:?");
		expect(entities).not.toBeNull();
		expect(entities.length).toBe(1);
		expect(entities[0].text).toBe("🍔");
		expect(entities[0].indices).toEqual([7, 18]);
	});

	test("should discover several shortnames", () => {
		const entities = emojify.parse(
			"Hungry :hamburger: and thirsty :beer:?",
		);
		expect(entities).not.toBeNull();
		expect(entities.length).toBe(2);
		expect(entities[0].text).toBe("🍔");
		expect(entities[0].indices).toEqual([7, 18]);

		expect(entities[1].text).toBe("🍺");
		expect(entities[1].indices).toEqual([31, 37]);
	});

	test("should discover single unicode emoji", () => {
		const entities = emojify.parse("Hungry 🍔?");
		expect(entities).not.toBeNull();
		expect(entities.length).toBe(1);
		expect(entities[0].shortname).toBe(":hamburger:");
		expect(entities[0].indices).toEqual([7, 9]);
	});

	test("should discover several unicode emojis", () => {});

	test("should compute proper indices with multiple codepoints emojis", () => {
		const entities = emojify.parse("La 🇫🇷");
		expect(entities).not.toBeNull();
		expect(entities.length).toBe(1);
		expect(entities[0].shortname).toBe(":flag-fr:");
		expect(entities[0].indices).toEqual([3, 7]);
	});

	test("should discover both shortnames and unicode emojis", () => {
		const entities = emojify.parse("Hungry 🍔 and thirsty :beer:?");
		expect(entities).not.toBeNull();
		expect(entities.length).toBe(2);
		expect(entities[0].shortname).toBe(":hamburger:");
		expect(entities[0].indices).toEqual([7, 9]);

		expect(entities[1].text).toBe("🍺");
		expect(entities[1].indices).toEqual([22, 28]);
	});

	test("should return entities with different indices when same emoji is present several times", () => {
		const entities = emojify.parse("I need food 🍔🍔🌮🍕🍕");
		expect(entities).not.toBeNull();
		expect(entities.length).toBe(5);

		expect(entities[0].shortname).toBe(":hamburger:");
		expect(entities[1].shortname).toBe(":hamburger:");
		expect(entities[2].shortname).toBe(":taco:");
		expect(entities[3].shortname).toBe(":pizza:");
		expect(entities[4].shortname).toBe(":pizza:");

		expect(entities[0].indices).not.toEqual(entities[1].indices);
		expect(entities[3].indices).not.toEqual(entities[4].indices);
	});
});
