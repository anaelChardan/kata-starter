import { add } from "../src/example";

describe("test add function", () => {
    it("should return 15 for add(10,5)", () => {
        expect(add(10, 5)).toBe(15);
    });
});