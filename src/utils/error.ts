export const error = {
    UNKNOWN_VALUE_ERROR: (unknown_value: string) => new Error("Unknown value at \'" + unknown_value + "...\'")
} as const;