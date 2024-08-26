import { describe, expect, it } from "vitest";
import { mapBy, setAt } from "@/utils/array";

describe("arrayUtils", () => {
  describe("setAt", () => {
    it("sets a value at a given index", () => {
      expect(setAt([1, 2, 3], 1, 4)).toEqual([1, 4, 3]);
    });

    it("sets a value at the end of the array", () => {
      expect(setAt([1, 2, 3], 2, 4)).toEqual([1, 2, 4]);
    });

    it("sets a value at the beginning of the array", () => {
      expect(setAt([1, 2, 3], 0, 4)).toEqual([4, 2, 3]);
    });

    it("sets a value at the beginning of the array with an empty array", () => {
      expect(setAt([], 0, 4)).toEqual([4]);
    });
  });

  describe("mapBy", () => {
    it("maps the elements in the array that match the predicate function", () => {
      const arr = [
        { name: "a", value: 1 },
        { name: "b", value: 2 },
        { name: "a", value: 3 },
      ];

      const result = mapBy(
        arr,
        (x) => x.name === "a",
        (x) => ({ ...x, value: x.value + 1 }),
      );

      expect(result).toEqual([
        { name: "a", value: 2 },
        { name: "b", value: 2 },
        { name: "a", value: 4 },
      ]);
    });
  });
});
