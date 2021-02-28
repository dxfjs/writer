export default class Tag {
    set value(value: number | string) {
        this._value = value;
    }
    get group_code(): number {
        return this._group_code;
    }
    get value(): number | string {
        return this._value;
    }
    private readonly _group_code: number;
    private _value: number | string;
    public constructor(group_code: number, value: number | string) {
        this._group_code = group_code;
        this._value = value;
    }

    public stringify():string {
        return `  ${this.group_code}\n${this.value}\n`;
    }
};