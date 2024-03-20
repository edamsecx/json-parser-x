import { appraiser, appraiserMaps } from "./utils/appraiser";
import { error } from "./utils/error";
import { numberConverter } from "./utils/number/converter";
import { escapeStrings } from "./utils/string/escape";

/**
 * this function is used to parse json string to object.
 * @param jsonString
 * @throws Error if jsonString is not a string
 * @returns T Parsed object
 * @example
 * ```ts
 * jsonParser<dataType>(data)
 * ```
 */
export function jsonParser<T = any>(jsonString: string): T {
  if (typeof jsonString !== "string") throw error.JSON_STRING_MUST_BE_STRING();
  if (jsonString.length === 0) throw error.JSON_STRING_IS_NOT_EMPTY();

  let pointer = 0;

  function* walker(): Generator<string, string, unknown> {
    while (pointer < jsonString.length) {
      pointer++;
      yield jsonString[pointer - 1];
    }

    return "";
  }

  const objectParser = () => {
    const object = {};
  };

  const stringParser = () => {
    const walk = walker();
    let string = "";

    while (true) {
      const char = walk.next().value;

      if (char === "\\") {
        const nextChar = walk.next().value;
        string += escapeStrings(nextChar);
        continue;
      } else if (char === '"') {
        break;
      }

      string += char;
    }

    return string;
  };

  const numberParser = (
    prefix: "-" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9",
  ) => {
    const walk = walker();
    let numberString = prefix;

    while (true) {
      const char = walk.next().value;

      numberString += char;

      if (!appraiserMaps[1]["prefix"].includes(char as never)) {
        pointer--;
        break;
      }
    }

    return numberConverter(numberString);
  };

  const booleanParser = (
    prefix: (typeof appraiserMaps)[2]["prefix"][number],
  ) => {
    const walk = walker();

    if (prefix === "t") {
      const expectedStrings = ["r", "u", "e"];
      const realityStrings = ["t"];

      for (let i = 0, len = expectedStrings.length; i < len; i++) {
        const char = walk.next().value;
        if (char !== expectedStrings[i]) {
          throw error.UNKNOWN_VALUE_ERROR(realityStrings.join(""));
        }
        realityStrings.push(char);
      }

      return true;
    } else {
      const expectedStrings = ["a", "l", "s", "e"];
      const realityStrings = ["f"];

      for (let i = 0, len = expectedStrings.length; i < len; i++) {
        const char = walk.next().value;
        if (char !== expectedStrings[i]) {
          throw error.UNKNOWN_VALUE_ERROR(realityStrings.join(""));
        }
        realityStrings.push(char);
      }

      return false;
    }
  };

  const nullParser = () => {
    const walk = walker();
    const expectedStrings = ["u", "l", "l"];
    const realityStrings = ["n"];

    for (let i = 0, len = expectedStrings.length; i < len; i++) {
      const char = walk.next().value;
      if (char !== expectedStrings[i]) {
        throw error.UNKNOWN_VALUE_ERROR(realityStrings.join(""));
      }
      realityStrings.push(char);
    }

    return null;
  };

  const value = () => {
    for (const char of walker()) {
      const charType = appraiser(char);

      if (charType === "empty") continue;
      if (charType === "number")
        return numberParser(
          char as (typeof appraiserMaps)[1]["prefix"][number],
        );
      if (charType === "string") return stringParser();
      if (charType === "boolean")
        return booleanParser(
          char as (typeof appraiserMaps)[2]["prefix"][number],
        );
      if (charType === "null") return nullParser();
      if (charType === "array") continue;
      if (charType === "object") return objectParser();
    }
  };

  return value() as T;
}

export class jsonCacheParser {
  cache: Map<any, any> = new Map();
  cacheKeyList: any[] = [];

  constructor(public maxCacheSize: number = Infinity) {
    if (this.maxCacheSize <= 0) {
      throw new Error("maxCacheSize must be greater than 0");
    }
  }

  parse<T = any>(jsonString: string): T {
    if (this.cache.has(jsonString)) {
      return this.cache.get(jsonString);
    } else {
      const result = jsonParser<T>(jsonString);
      if (this.cache.size >= this.maxCacheSize) {
        const firstKey = this.cacheKeyList.shift();
        if (firstKey) this.cache.delete(firstKey);
      }
      const cacheKey = JSON.stringify(result);
      this.cache.set(cacheKey, result);
      this.cacheKeyList.push(cacheKey);
      return result;
    }
  }
}
