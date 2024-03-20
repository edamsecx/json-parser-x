import Benchmark from "benchmark";
import { jsonParser } from "../src-oreilly";
import { OldJSONParser } from "./old";
import { jsonCompiler } from "../src-compiler";

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

const native = () => {
  return JSON.parse(exData);
};

const oreilly = () => {
  return jsonParser(exData);
};

const compiler = () => {
  return jsonCompiler(exData);
}

const old = () => {
  return OldJSONParser(exData);
};

suite
  .on("start", () => {
    console.log("[Benchmark Start]");
  })
  .add("Native JSON Parser", () => {
    native();
  })
  .add("Oreilly JSON Parser", () => {
    oreilly();
  })
  .add("Oreilly Old JSON Parser", () => {
    old();
  })
  .add("JSON Compiler", () => {
    compiler();
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
