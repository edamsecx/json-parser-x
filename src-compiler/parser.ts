import { JSONLexer } from "./lexer";

export function JSONParser(tokens: Tokens): SyntaxTree {
    
    let pointer = 0;

    function* walker(): Generator<Token, null, unknown> {
        while (pointer < tokens.length) {
            pointer++;
            yield tokens[pointer - 1];
        }

        return null;
    }

    const back = () => {
        pointer--;
        return tokens[pointer];
    }

    const arrayParser = (): ArrayChildren => {
        const array: ArrayChildren = [];

        for (const token of walker()) {
            if (token.type === "Comma") continue;
            if (token.type === "RightBracket") break;
            back();
            array.push(valueParser());
        }

        return array;
    }

    const objectParser = (): ObjectChildren => {
        const object: ObjectChildren = {};
        let KeyName = "";

        for (const token of walker()) {
            if (token.type === "Comma" && KeyName === "") continue;
            if (token.type === "Colon" && KeyName === "") continue;
            if (token.type === "RightBrace" && KeyName === "") break;

            if (KeyName === "") {
                if (token.type === "String") {
                    KeyName = token.value;
                } else {
                    throw new Error("Unknown key name format");
                }
                continue;
            }else {
                back();
                object[KeyName] = valueParser();
                KeyName = "";
                continue;
            }
        }

        return object;
    }

    const valueParser = (): SyntaxTree => {
        for (const token of walker()) {
            if (token.type === "String") {
                return {
                    type: "String",
                    children: token.value
                };
            } else if (token.type === "Number") {
                const parsedNumber = Number(token.value);
                if (Number.isNaN(parsedNumber)) {
                    throw new Error("Unknown number format");
                }
                return {
                    type: "Number",
                    children: parsedNumber
                };
            } else if (token.type === "Boolean") {
                return {
                    type: "Boolean",
                    children: token.value === "true"
                };
            } else if (token.type === "Null") {
                return {
                    type: "Null",
                    children: null
                };
            } else if (token.type === "LeftBracket") {
                return {
                    type: "Array",
                    children: arrayParser()
                };
            } else if (token.type === "LeftBrace") {
                return {
                    type: "Object",
                    children: objectParser()
                };
            }
        }

        throw new Error("Unknown value format");
    }

    return valueParser();
}
