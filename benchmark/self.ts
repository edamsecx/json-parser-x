import { jsonParser } from "../src";

jsonParser(`{
    "string": "string",
    "number": 123,
    "boolean": true,
    "null": null,
    "array": [
        "string"
    ],
    "object": {
        "key": "value",
        "array": [
            {}
        ]
    }
}`)