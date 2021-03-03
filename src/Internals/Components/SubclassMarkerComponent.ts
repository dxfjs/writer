import Tag from "../Tag.js";
import DXFInterface from "../Interfaces/DXFInterface.js";

export default class SubclassMarkerComponent implements DXFInterface {
    get subclass(): string {
        return this._subclass.value.toString();
    }
    set subclass(value: string) {
        this._subclass.value = value;
    }
    private readonly _subclass: Tag;
    public constructor(subclass: string) {
        this._subclass = new Tag(100, subclass);
    }
    stringify(): string {
        return this._subclass.stringify();
    }
    tags(): Tag[] {
        return [this._subclass];
    }
};
