import { error } from "../error";

export function numberParser(num: string): number {
    const parsedValue = Number(num);

    if (isNaN(parsedValue)) throw error.UNKNOWN_NUMBER_ERROR(num);

    return parsedValue;
}