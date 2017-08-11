import { asciiToShortName, shortNameToAscii } from "../emojify";

describe("Ascii replacer", () => {
    describe("from text to shortnames", () => {
        it("detects single ascii emoji", () => {
            const text = "I am so happy! :o)";
            expect(asciiToShortName(text)).toBe("I am so happy! :monkey-face:");

            // Basic escaped emoticon
            expect(asciiToShortName("I &lt;3 you")).toBe("I :heart: you");
            expect(asciiToShortName("Get out &lt;/3 !")).toBe("Get out :broken-heart: !");

            // Several emoticons referring to the same emoji
            expect(asciiToShortName(":p")).toBe(":stuck-out-tongue:");
            expect(asciiToShortName(":-p")).toBe(":stuck-out-tongue:");
            expect(asciiToShortName(":P")).toBe(":stuck-out-tongue:");
            expect(asciiToShortName(":-P")).toBe(":stuck-out-tongue:");
            expect(asciiToShortName(":b")).toBe(":stuck-out-tongue:");
            expect(asciiToShortName(":-b")).toBe(":stuck-out-tongue:");
        });

        it("detects multiple ascii emojis correctly", () => {
            expect(asciiToShortName(":-( :p")).toBe(":disappointed: :stuck-out-tongue:");
            expect(asciiToShortName("8) () 8)")).toBe(":sunglasses: () :sunglasses:");
            expect(asciiToShortName("8) ) 8)")).toBe(":sunglasses: ) :sunglasses:");
        });

        it("should not detect emojis that are part of bigger parentethis expression", () => {
            const text = "We should meet tonight. (around 7 - 8)";
            expect(asciiToShortName(text)).toBe(text);

            expect(asciiToShortName("(foo 8)")).toBe("(foo 8)");
            expect(asciiToShortName("8) ( 8)")).toBe(":sunglasses: ( 8)");
        });
    });

    describe("from shortnames to ascii", () => {
        it("should convert known shortnames to ascii", () => {
            expect(shortNameToAscii(":sunglasses: :winking-stuck-out-tongue:")).toBe("8) ;p");
        });

        it("should drop skin-tone modifiers", () => {
            expect(shortNameToAscii(":sunglasses: :ear::skin-tone-3:")).toBe("8) :ear:");
        });
    });
});
