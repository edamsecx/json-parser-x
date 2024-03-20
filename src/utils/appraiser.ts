import { error } from "./error";

export const appraiserMaps = [
  {
    prefix: ['"'],
    type: "string",
  },
  {
    prefix: ["-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    type: "number",
  },
  {
    prefix: ["t", "f"],
    type: "boolean",
  },
  {
    prefix: ["n"],
    type: "null",
  },
  {
    prefix: ["["],
    type: "array",
  },
  {
    prefix: ["{"],
    type: "object",
  },
  {
    prefix: [" "],
    type: "empty",
  },
] as const;

export function appraiser<T>(prefix: string): JsonTypes | Empty {
  for (const appraiserMap of appraiserMaps) {
    if (appraiserMap.prefix.includes(prefix as never)) return appraiserMap.type;
  }

  throw error.UNKNOWN_VALUE_ERROR(prefix);
}
