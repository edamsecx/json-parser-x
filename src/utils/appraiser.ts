import { error } from "./error";

export function appraiser<T>(prefix: string): JsonTypes | Empty {
  switch (prefix) {
    case '"':
      return "string";
    case "-":
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return "number";
    case "t":
    case "f":
      return "boolean";
    case "n":
      return "null";
    case "[":
      return "array";
    case "{":
      return "object";
    case " ":
      return "empty";
    default:
      throw error.UNKNOWN_VALUE_ERROR(prefix);
  }
}
