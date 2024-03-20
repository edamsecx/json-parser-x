type PrimitiveTokenTypes =
  | "String" // "string"
  | "Number" // "-123" | "123" | "12e+3" | "12E+3"
  | "Boolean" // "true" | "false"
  | "Null"; // "null"

type SyntaxTokenTypes =
  | "LeftBrace" // "{"
  | "rightBrace" // "}"
  | "LeftBracket" // "["
  | "RightBracket" // "]"
  | "Comma" // ","
  | "Colon"; // ":"

type TokenTypes = PrimitiveTokenTypes | SyntaxTokenTypes;

type Token = {
  type: TokenTypes;
  value: string;
};

type Tokens = Token[];
