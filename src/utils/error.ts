export const error = {
  UNKNOWN_VALUE_ERROR: (unknown_value: string) =>
    new Error("Unknown value at '" + unknown_value + "...'"),
  UNKNOWN_NUMBER_ERROR: (unknown_number: string) =>
    new Error("Unknown number at " + unknown_number),
  JSON_STRING_MUST_BE_STRING: () => new Error("jsonString must be a string"),
  JSON_STRING_IS_NOT_EMPTY: () => new Error("jsonString is not empty"),
  ARRAY_COMMA_ERROR: () => new Error("Array comma error at [...,,...]"),
  OBJECT_COMMA_ERROR: () => new Error("Object comma error at {...,,...}"),
  OBJECT_COLON_ERROR: () => new Error("Object colon error at {...::...}"),
} as const;
