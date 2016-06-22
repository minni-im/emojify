jest.unmock("../emojify");

import * as emojify from "../emojify";

describe("emojify", () => {

  describe("unicode to shortnames conversion", () => {
    it("should detect unicode emojis", () => {
      expect(emojify.unicodeToShortName("Hello 🌎, this is 🚀")).toBe("Hello :earth_americas:, this is :rocket:");
    });
  });

  describe("shortnames to unicode conversion", () => {
    it("should replace known emojis", () => {
      const text = "Hello :earth_americas:, this is :rocket:";
      expect(emojify.shortNameToUnicode(text)).toBe("Hello 🌎, this is 🚀");
    });

    it("should detect separate skin tone varation", () => {
      const text = "Ear with skin tone 6 :ear::skin-tone-6:";
      expect(emojify.shortNameToUnicode(text)).toBe("Ear with skin tone 6 👂🏿");
    });

    it("should not replace unknown emojis", () => {
      const text = "This :emoji: does not exist. This one :rocket: does!";
      expect(emojify.shortNameToUnicode(text)).toBe("This :emoji: does not exist. This one 🚀 does!")
    })
  });
});
