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
  cache: Map<string, any> = new Map();
  cacheKeyList: string[] = [];

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
      const cacheKey = this.toHash(jsonString);
      this.cache.set(cacheKey, result);
      this.cacheKeyList.push(cacheKey);
      return result;
    }
  }

  toHash(jsonString: string): string {
    let a = 5381;
    for (let c = jsonString.length; c--; )
      (a += jsonString.charCodeAt(c)), (a += a << 10), (a ^= a >> 6);
    a += a << 3;
    a ^= a >> 11;
    return (((a + (a << 15)) & 4294967295) >>> 0).toString(16);
  }
}
