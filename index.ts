/**
 * this function is used to parse json string to object.
 * @param jsonString
 * @throws Error if jsonString is not a string
 * @returns T Parsed object
 * @example
 * ```ts
 * jsonParser<dataType>(data)
 * ```
 */
export function jsonParser<T = any>(jsonString: string): T {
  if (typeof jsonString !== "string")
    throw new Error("jsonString must be a string");

  if (jsonString.length === 0) throw new Error("jsonString is empty");

  let pointer = 0;
  const length = jsonString.length;

  function* walker(): Generator<string | undefined, void, undefined> {
    while (pointer < length) {
      const char = jsonString[pointer];
      pointer++;
      yield char;
    }

    return undefined;
  }

  let guide: Guide = {
    history: [],
    get lastchar() {
      if (this.history.length === 0) return undefined;

      return this.history[this.history.length - 1];
    },
    set lastchar(char: string | undefined) {
      if (char === undefined) return;
      this.history.push(char);
    },
    expectation: undefined,
    nextchar(step = 1) {
      return jsonString[pointer + step] ?? undefined;
    },
    prevchar(step = 1) {
      return jsonString[pointer - step] ?? undefined;
    }
  };

  for (const char of walker()) {
    if (char === undefined) throw new Error("failed to parse json");
    guide.lastchar = char;

    if (guide.lastchar === undefined) {
      // empty case
      const type = predictionType(char);
      if (type === undefined) continue;
      guide.expectation = type;
    }

    // prediction type switch
    switch (guide.expectation) {
      case "string":
        if (char === '"') {
          // is "" ?
          const nextchar = guide.nextchar();
          const afternextchar = guide.nextchar(2);
          const prevchar = guide.prevchar();

          if (nextchar === '"' && afternextchar === '"') {
            pointer += 2;
            break;
          }

          if (nextchar === '"' && afternextchar !== '"') {
            pointer += 2; // ""(?) <= skip
            guide.lastchar = '"';
            guide.expectation = undefined;
            break;
          }else if (prevchar === '"') {
            throw new Error("failed to parse string (\"\"...\" <<<) in json");
          }

            // in string
            let content = "";
            let i = 0;

            // reading string
            while (true) {
              const nextchar = guide.nextchar(i);
              if (nextchar === undefined) break;
              content += nextchar;
              guide.lastchar = nextchar;
              i++;
              if (nextchar === '"') break;
            }

            pointer += i;

            break;
        }
        break;
      default:
        throw new Error("failed to parse json");
    }
  }

  return JSON.parse(jsonString);
}

function predictionType(char: string): Types | undefined {
  if (char === '"') return "string";
  if (char === "t") return "true";
  if (char === "f") return "false";
  if (char === "n") return "null";
  if (char === "[") return "array";
  if (char === "{") return "object";

  // is Empty
  return undefined;
}

type Types = "string" | "true" | "false" | "null" | "array" | "object";

interface Guide {
  history: string[];
  get lastchar(): string | undefined;
  set lastchar(char: string | undefined);
  expectation: Types | undefined;
  nextchar(step?: number): string | undefined;
  prevchar(step?: number): string | undefined;
}
