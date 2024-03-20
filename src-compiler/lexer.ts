export function JSONLexer(jsonString: string): Token[] {
  let pointer = 0;
  function* walker(): Generator<string, string, unknown> {
    while (pointer < jsonString.length) {
      pointer++;
      yield jsonString[pointer - 1];
    }
    return "";
  }
  const back = () => {
    pointer--;
    return jsonString[pointer];
  };

  const TokensArray: Token[] = [];

  for (const char of walker()) {
    // Skip Spaces
    if (char === " ") continue;
    // Primitive Reading
    if (char === '"') {
      let value = "";
      while (true) {
        const char = walker().next().value;
        if (char === '"') break;
        if (char === "\\") {
          const nextChar = walker().next().value;
          if (nextChar === "u") {
            let uhex = 0;
            for (let i = 0; i < 4; i += 1) {
              const hex = parseInt(walker().next().value, 16);
              if (!isFinite(hex)) {
                back();
                break;
              }
              uhex = uhex * 16 + hex;
            }
            value += String.fromCharCode(uhex);
          } else {
            value += escapeStrings(nextChar);
          }
          continue;
        }
        value += char;
      }
      TokensArray.push({ type: "String", value });
      continue;
    } else if (
      ["-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char)
    ) {
      let value = char;
      while (true) {
        const char = walker().next().value;
        if (
          ![
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            ".",
            "e",
            "E",
            "+",
            "-",
          ].includes(char)
        ) {
          if (char !== "") {
            back();
          }
          break;
        }
        value += char;
      }
      TokensArray.push({ type: "Number", value });
      continue;
    }else if (char === "t") {
      const expectedStrings = ["r", "u", "e"];

      for (let i = 0, len = expectedStrings.length; i < len; i++) {
        const char = walker().next().value;
        if (char !== expectedStrings[i]) {
          throw new Error("Unknown primitive character");
        }
      }

      TokensArray.push({ type: "Boolean", value: "true" });
      continue;
    } else if (char === "f") {
      const expectedStrings = ["a", "l", "s", "e"];

      for (let i = 0, len = expectedStrings.length; i < len; i++) {
        const char = walker().next().value;
        if (char !== expectedStrings[i]) {
          throw new Error("Unknown primitive character");
        }
      }

      TokensArray.push({ type: "Boolean", value: "false" });
    } else if (char === "n") {
      const expectedStrings = ["u", "l", "l"];

      for (let i = 0, len = expectedStrings.length; i < len; i++) {
        const char = walker().next().value;
        if (char !== expectedStrings[i]) {
          throw new Error("Unknown primitive character");
        }
      }

      TokensArray.push({ type: "Null", value: "null" });
      continue;
    }

    // Syntax Reading
    switch (char) {
      case "{":
        TokensArray.push({ type: "LeftBrace", value: char });
        break;
      case "}":
        TokensArray.push({ type: "rightBrace", value: char });
        break;
      case "[":
        TokensArray.push({ type: "LeftBracket", value: char });
        break;
      case "]":
        TokensArray.push({ type: "RightBracket", value: char });
        break;
      case ",":
        TokensArray.push({ type: "Comma", value: char });
        break;
      case ":":
        TokensArray.push({ type: "Colon", value: char });
        break;
      default:
        throw new Error("Unknown syntax character");
    }
  }

  return TokensArray;
}

function escapeStrings(char: string): string {
  switch (char) {
    case "\"":
      return '\"';
    case "\\":
      return "\\";
    case "/":
      return "/";
    case "b":
      return "\b";
    case "f":
      return "\f";
    case "n":
      return "\n";
    case "r":
      return "\r";
    case "t":
      return "\t";
    default:
      return char;
  }
}

const exData = `[123,"a",234e+2]`


const start = performance.now()
const parsed = JSONLexer(exData)
const end = performance.now()
console.log(parsed, end - start + "ms")