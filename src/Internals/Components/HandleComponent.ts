import Tag from "../Tag";
import DXFInterface from "../Interfaces/DXFInterface";

export default class ThicknessComponent implements DXFInterface {
    get handle(): string {
        return this._handle.value.toString();
    }
    set handle(value: string) {
        this._handle.value = value;
    }
    private readonly _handle: Tag;
    public constructor(handle : string) {
        this._handle = new Tag(100, handle );
    }
    stringify(): string {
        return this._handle.stringify();
    }
    tags(): Tag[] {
        return [this._handle];
    }
};
