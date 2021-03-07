import Tag          from "../Tag";
import DXFInterface from "../Interfaces/DXFInterface";

export default class NameComponent implements DXFInterface {
    get groupCode(): number {
        return this._tag.groupCode;
    }
    set groupCode(value: number) {
        this._tag.groupCode = value;
    }
    get name(): string {
        return this._tag.value.toString();
    }
    set name(value: string) {
        this._tag.value = value;
    }
    private readonly _tag: Tag;
    public constructor(name: string, groupCode: number = 2) {
        this._tag = new Tag(groupCode, name);
    }

    stringify(): string {
        return this._tag.stringify();
    }

    tags(): Tag[] {
        return [this._tag];
    }
}