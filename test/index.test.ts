import { it, describe, expect } from "bun:test";
import { jsonParser } from "..";

const exData = `{
    "string": "string",
    "number": 123,
    "boolean": true,
    "null": null,
    "array": [
        "string"
    ],
    "object": {
        "key": "value",
        "array": [
            {}
        ]
    }
}`;

type typeExData = {
  string: string;
  number: number;
  boolean: boolean;
  null: null;
  array: string[];
  object: {
    key: string;
    array: any[];
  };
};

describe("Parser works?", () => {
  it("error case", () => {
    const errorDatas = [1, null, false, Promise];

    for (const errorData of errorDatas) {
      expect(() => jsonParser(errorData as unknown as string)).toThrow();
    }
  });

  it("object works", () => {
    expect<typeExData>(jsonParser<typeExData>(exData)).toEqual(
      JSON.parse(exData),
    );
  });

  it("primitive works", () => {
    const primitiveDatas = ['"amex"', "123", "true", "null"];

    for (const primitiveData of primitiveDatas) {
      expect(jsonParser(primitiveData)).toBe(JSON.parse(primitiveData));
    }
  });
});
