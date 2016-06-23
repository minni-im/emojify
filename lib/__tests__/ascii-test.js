jest.unmock("../emojify");

import {
    asciiToShortName
} from "../emojify";

describe("Ascii emojis replacer", () => {
    it("detects single ascii emoji", () => {
        const text = "I am so happy! :o)";
        expect(asciiToShortName(text)).toBe("I am so happy! :monkey_face:");

        // Basic escaped emoticon
        expect(asciiToShortName("I &lt;3 you")).toBe("I :heart: you");
        expect(asciiToShortName("Get out &lt;/3 !")).toBe("Get out :broken_heart: !");

        // Several emoticons referring to the same emoji
        expect(asciiToShortName(":p")).toBe(":stuck_out_tongue:");
        expect(asciiToShortName(":-p")).toBe(":stuck_out_tongue:");
        expect(asciiToShortName(":P")).toBe(":stuck_out_tongue:");
        expect(asciiToShortName(":-P")).toBe(":stuck_out_tongue:");
        expect(asciiToShortName(":b")).toBe(":stuck_out_tongue:");
        expect(asciiToShortName(":-b")).toBe(":stuck_out_tongue:");
    });

    it("detects multiple ascii emojis correctly", () => {
        expect(asciiToShortName(":-( :p")).toBe(":disappointed: :stuck_out_tongue:");
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
