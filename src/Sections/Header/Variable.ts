import Tag          from "../../Internals/Tag";
import DXFManager   from "../../Internals/DXFManager";

export default class Variable extends DXFManager {
    get variableName(): string {
        return this._variableName;
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
    private readonly _variableName: string;
    private readonly _group_code: number;
    private _value: number | string;
    public constructor(variableName: string, group_code: number, value: number | string) {
        super();
        this._variableName = variableName;
        this._group_code = group_code;
        this._value = value;
    }

    public tags(): Tag[] {
        return this.standard([[9, `$${this.variableName}`], [this.group_code, this.value]]);
    }
};
