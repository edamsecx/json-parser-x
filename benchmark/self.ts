import { jsonParser } from "../src";

jsonParser(
  JSON.stringify({
    string: "string",
    number: 123,
    boolean: true,
    null: null,
    array: ["string"],
    object: {
      key: "value",
      array: [{}],
    },
  }),
);
