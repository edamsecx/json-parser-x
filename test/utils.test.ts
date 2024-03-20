import { it, describe, expect } from "bun:test";
import { appraiser } from "../src/utils/appraiser";
import { numberConverter } from "../src/utils/number/converter";

const exPrefixMaps = {
  '"': "string",
  "-123": "number",
  "123": "number",
  "12e+3": "number",
  "12E+3": "number",
  true: "boolean",
  false: "boolean",
  null: "null",
  "[1, 2, 3]": "array",
  '{ "a": 123 }': "object",
} as const;

const exNumberMaps = {
  "-123": -123,
  "123": 123,
  "12e+3": 12e3,
  "12E+3": 12e3,
};

describe("utils works?", () => {
  it("appraiser works?", () => {
    for (const [key, value] of Object.entries(exPrefixMaps)) {
      expect(appraiser(key.charAt(0))).toBe(value);
    }
  });

  it("appraiser error works?", () => {
    expect(() => appraiser("xxx")).toThrow();
  });

  it("number converter works?", () => {
    for (const [key, value] of Object.entries(exNumberMaps)) {
      expect(numberConverter(key)).toBe(value);
    }
  });
});
