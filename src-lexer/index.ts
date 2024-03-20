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
  }

  const TokensArray: Token[] = [];

  for (const char of walker()) {
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
                back()
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
    } else if (["-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char)) {
      let value = "";
      while (true) {
        const char = walker().next().value;
        if (!["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "e", "E"].includes(char)) {
            back()
            break;
        }
        value += char;
      }
      TokensArray.push({ type: "Number", value });
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
      case " ":
        // Empty
        break;
      default:
        throw new Error("Unknown syntax character: " + char);
    }
  }

  return TokensArray;
}

function escapeStrings(char: string): string {
  switch (char) {
    case '"':
      return '\\"';
    case "\\":
      return '\\\\';
    case "\b":
      return '\\b';
    case "\f":
      return '\\f';
    case "\n":
      return '\\n';
    case "\r":
      return '\\r';
    case "\t":
      return '\\t';
    default:
      return char;
  }
}