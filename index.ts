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
