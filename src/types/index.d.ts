/**
 * "string" 123 -123 12e+3 12E+3 true false null
 *     ^            ^                ^        ^
 *  string        number          boolean    null
 */
type PrimitiveTypes = "string" | "number" | "boolean" | "null";
/**
 * [1, 2, 3] { "a": 123 }
 *     ^           ^
 *   array       object
 */
type StructureTypes = "array" | "object";
type JsonTypes = PrimitiveTypes | StructureTypes;
/**
 * { "a": 123 }
 *  ^    ^   ^
 *     Empty
 */
type Empty = "empty";
