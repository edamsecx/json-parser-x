export const error = {
    UNKNOWN_VALUE_ERROR: (unknown_value: string) => new Error("Unknown value at \'" + unknown_value + "...\'"),
    UNKNOWN_NUMBER_ERROR: (unknown_number: string) => new Error("Unknown number at " + unknown_number),
    JSON_STRING_MUST_BE_STRING: (json_string: string) => new Error("jsonString must be a string at " + json_string.slice(0, 10) + "..."),
} as const;