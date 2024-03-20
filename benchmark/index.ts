import Benchmark from "benchmark";
import { jsonParser } from "../src";
import { OldJSONParser } from "./old";

const suite = new Benchmark.Suite();

// const exData = JSON.stringify({
//   name: "Amex",
//   age: 14,
//   isX: true,
//   information: {
//     github: "@EdamAme-x",
//     gitlab: null,
//     twitter: "@amex2189",
//   },
//   achievement: ["SuperX", true, {}],
// });

const exData = `[1,2,3]`

const naitive = () => {
  return JSON.parse(exData);
};

const self = () => {
  return jsonParser(exData);
};

const old = () => {
  return OldJSONParser(exData);
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
  .add("Old JSON Parser", () => {
    old();
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
