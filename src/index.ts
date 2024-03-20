import { appraiser } from "./utils/appraiser";
import { error } from "./utils/error";

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
  }

  const nullParser = () => {
    const walk = walker()
    const expectedStrings = ["u", "l", "l"];
    const RealityStrings = ["n"];

    for (let i = 0, len = expectedStrings.length; i < len; i++) {
      const char = walk.next().value;
      if (char !== expectedStrings[i]) {
        throw error.UNKNOWN_VALUE_ERROR(RealityStrings.join(""));
      }
      RealityStrings.push(char);
    }

    return null;
  }

  const value = () => {
    for (const char of walker()) {
      const charType = appraiser(char);

      if (charType === "empty") continue;
      if (charType === "number") continue;
      if (charType === "string") continue;
      if (charType === "boolean") continue;
      if (charType === "null") return nullParser();
      if (charType === "array") continue;
      if (charType === "object") return objectParser();
    }
  }

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
