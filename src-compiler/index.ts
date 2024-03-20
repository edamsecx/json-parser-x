import { JSONLexer } from "./lexer";
import { JSONParser } from "./parser";

export function jsonCompiler<T = any>(jsonString: string): T {
    const tokens = JSONLexer(jsonString);
    const syntaxTree = JSONParser(tokens);

    const value = (currentSyntaxTree: SyntaxTree) => {
        if (currentSyntaxTree.type === "String") return currentSyntaxTree.children;
        if (currentSyntaxTree.type === "Number") return currentSyntaxTree.children;
        if (currentSyntaxTree.type === "Boolean") return currentSyntaxTree.children;
        if (currentSyntaxTree.type === "Null") return null;
        if (currentSyntaxTree.type === "Object") {
            const object: Record<string, any> = {};
            for (const [key, val] of Object.entries(currentSyntaxTree.children as ObjectChildren)) {
                object[key] = value(val);
            }
            return object;
        }
        if (currentSyntaxTree.type === "Array") {
            const array: any[] = [];
            for (const val of currentSyntaxTree.children as ArrayChildren) {
                array.push(value(val));
            }
            return array;
        }
    };

    return value(syntaxTree) as T;
}
