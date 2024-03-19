import Benchmark from "benchmark";
import { jsonParser } from "..";
import { toJSON } from "flatted"; 

const suite = new Benchmark.Suite();

const exData = JSON.stringify({
    name: "Amex",
    age: 14,
    isX: true,
    information: {
        github: "@EdamAme-x",
        gitlab: null,
        twitter: "@amex2189"
    },
    achievement: ["SuperX", true, {}]
});

const naitive = () => {
    return JSON.parse(exData);
}

const self = () => {
    return jsonParser(exData);
}

const flatted = () => {
    return toJSON(exData);
}

suite.on('start', () => {
    console.log('[Benchmark Start]')
  }).add('Naitive JSON Parser', () => {
    naitive()
  }).add('Self-made JSON Parser', () => {
    self()
  }).add('Flatted JSON Parser', () => {
    flatted()
  }).on('cycle', (event: Event) => {
    console.log(String(event.target))
  }).on('complete', function () {
    // @ts-expect-error
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  }).run({ async: true })