import Benchmark from "benchmark";
import { jsonCacheParser, jsonParser } from "../src";
import { toJSON } from "flatted";
import { OldJSONParser } from "./old";

const suite = new Benchmark.Suite();

const exData = JSON.stringify({
  name: "Amex",
  age: 14,
  isX: true,
  information: {
    github: "@EdamAme-x",
    gitlab: null,
    twitter: "@amex2189",
  },
  achievement: ["SuperX", true, {}],
});

const naitive = () => {
  return JSON.parse(exData);
};

const self = () => {
  return jsonParser(exData);
};

const flatted = () => {
  return toJSON(exData);
};

const old = () => {
  return OldJSONParser(exData);
};

const cacheParser = new jsonCacheParser();

const cache = () => {
  return cacheParser.parse(exData);
};

suite
  .on("start", () => {
    console.log("[Benchmark Start]");
  })
  .add("Naitive JSON Parser", () => {
    naitive();
  })
  .add("Self-made JSON Parser", () => {
    self();
  })
  .add("Flatted JSON Parser", () => {
    flatted();
  })
  .add("Old JSON Parser", () => {
    old();
  })
  .add("Self-made Cache JSON Parser", () => {
    cache();
  })
  .on("cycle", (event: Event) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(
      //@ts-expect-error
      `[Fastest]\n${this.filter("fastest")
        .map("name")
        .map((name: string, index: number) => ` ${index + 1}. ${name}`)
        .join("\n")}\n ...`,
    );
  })
  .run({ async: true });
