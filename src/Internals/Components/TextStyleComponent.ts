import Tag from "../Tag.js";
import DXFInterface from "../Interfaces/DXFInterface.js";

export default class TextStyleComponent implements DXFInterface {
    get name(): string {
        return this._name.value.toString();
    }
    set name(value: string) {
        this._name.value = value;
    }
    private readonly _name: Tag;
    public constructor(name: string) {
        this._name = new Tag(7, name);
    }
    stringify(): string {
        return this._name.stringify();
    }
    tags(): Tag[] {
        return [this._name];
    }
};
