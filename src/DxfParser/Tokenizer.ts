export type SpecificationMap = Map<number, string>;

export type token_t = {
    code: number;
    value: string;
    line: number;
};

export type tokens_t = token_t[];

export function token(code: number, value: string, line: number): token_t {
    return { code, value, line };
}

export function type(token: token_t) {
    return token.code === 0;
}

export function entity(name: string) {
    return function (token: token_t) {
        return type(token) && token.value === name;
    };
}

export function section(token: token_t) {
    return type(token) && token.value === 'SECTION';
}

export function endsec(token: token_t) {
    return type(token) && token.value === 'ENDSEC';
}

export function eof(token: token_t) {
    return type(token) && token.value === 'EOF';
}

export function ename(name: string) {
    return function (token: token_t) {
        return token.code === 2 && token.value === name;
    };
}

export function last<T>(arr: T[]) {
    return arr[arr.length - 1]
}

export default class Tokenizer {

    #tokens: tokens_t = [];
    index: number;
    error?: string;

    constructor(content: string) {
        const tokensOrError = this.tokens(content);
        if (Array.isArray(tokensOrError)) this.#tokens = tokensOrError;
        else this.error = tokensOrError;
        this.index = 0;
    }

    get cline() {
        return this.index * 2 + 1;
    }

    get vline() {
        return this.index * 2 + 2;
    }

    tokens(content: string) {
        const lines = content.trim().split(/\r\n|\r|\n/g);
        if (lines.length % 2 !== 0) {
            const error = `The number of line should be even!`;
            return error;
        }
        const tokens: tokens_t = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i++]?.trim();
            if (line && this.numeric(line)) {
                const code = parseInt(line);
                const value = lines[i]?.trim();
                if (value !== undefined) tokens.push(token(code, value, i));
            } else {
                const error = `Expected group code at line ${i}!`;
                return error;
            }
        }
        return tokens;
    }

    exceptSectionOrEof() {
        return !(this.is(section) || this.is(endsec) || this.is(eof))
    }

    exceptTable() {
        return !this.is(entity('TABLE')) && !this.is(entity('ENDTAB'));
    }

    numeric(str: string) {
        return /^\d+$/g.test(str);
    }

    advance(count = 1) {
        this.index += count;
    }

    hasNext() {
        return this.index < this.#tokens.length;
    }

    next() {
        return this.#tokens[this.index++];
    }

    peek() {
        return this.#tokens[this.index];
    }

    rewind(count = 1) {
        this.index -= count;
    }

    is(fn: (token: token_t) => boolean) {
        const peek = this.peek();
        if (peek) return fn(peek);
        return false;
    }

    type(name: string, fn: (token: token_t) => boolean) {
        if (!this.is(fn)) return false;
        this.next();
        const r = this.is(ename(name));
        this.rewind();
        return r;
    }

    has(spec: SpecificationMap) {
        return this.hasNext() && spec.has(this.peek()?.code!)
    }
}
