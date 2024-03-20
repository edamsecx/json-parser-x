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

type PrimitiveSyntaxTreeTypes = "String" | "Number" | "Boolean" | "Null";
type StructureSyntaxTreeTypes = "Object" | "Array";
type SyntaxTreeTypes = PrimitiveSyntaxTreeTypes | StructureSyntaxTreeTypes;
type KeyName = string;
type ObjectChildren = Record<KeyName, SyntaxTree>;
type ArrayChildren = SyntaxTree[];
type StringChildren = string;
type NumberChildren = number;
type BooleanChildren = boolean;
type NullChildren = null;
type Children = ObjectChildren | ArrayChildren | StringChildren | NumberChildren | BooleanChildren | NullChildren;

type SyntaxTree = {
  type: SyntaxTreeTypes;
  children: Children; 
}