export function JSONParser(tokens: Tokens): SyntaxTree {
    return {
        type: "Object",
        children: {
            "name": {
                type: "String",
                children: "Amex",
            }
        },
    };
}