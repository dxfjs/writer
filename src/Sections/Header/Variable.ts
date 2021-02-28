import Tag from "../../Internals/Tag.js";

export default class Variable {
    get name(): string {
        return this._name;
    }
    get group_code(): number {
        return this._group_code;
    }
    get value(): number | string {
        return this._value;
    }
    set value(value: number | string) {
        this._value = value;
    }
    private readonly _name: string;
    private readonly _group_code: number;
    private _value: number | string;
    public constructor(name: string, group_code: number, value: number | string) {
        this._name = name;
        this._group_code = group_code;
        this._value = value;
    }

    public tags(): Tag[] {
        return [
            new Tag(9, `$${this.name}`),
            new Tag(this.group_code, `${this.value}`)
        ];
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }
};