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
  if (typeof jsonString !== "string")
    throw new Error("jsonString must be a string");

  if (jsonString.length === 0) throw new Error("jsonString is empty");

  return JSON.parse(jsonString);
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
