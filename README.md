# json-parser-x

JSON Parser with TypeScript | for Zenn  
! Note that it does not follow strict specifications. !

[JSON Parse (o'reilly version)](/src-oreilly)  
Standard self-recursion parser  
String => Split String (Raw String Tokens) => JSON  
Vulnerable to collapsed json

[JSON Lexer & JSON Parser (JSON Compiler)](/src-lexer)  
JSON Compiler Lexer & Parser  
String => Tokens => Syntax Tree => JSON  
High self-correction capability

|Name|Description|Strict|Speed|self-fix|
|---|---|---|---|---|
|Native|Native JSON Parser|✅|✅|❌|
|Old Oreilly|Old O'reilly JSON Parser|❌|🔼 +|🔼 +|
|Oreilly|O'reilly JSON Parser|🔼 +|🔼 -|🔼 +|
|Compiler|JSON Compiler|✅|❌|✅|

Created by [@amex2189](https:///twitter.com/amex2189)
