import Tag from "../Tag";
import DXFInterface from "../Interfaces/DXFInterface";

export default class HandleComponent implements DXFInterface {
    get handle(): string {
        return this._handle.value.toString();
    }
    set handle(value: string) {
        this._handle.value = value;
    }
    private readonly _handle: Tag;
    public constructor(handle : string) {
        this._handle = new Tag(5, handle, 'AC1012');
    }
    stringify(): string {
        return this._handle.stringify();
    }
    tags(): Tag[] {
        return [this._handle];
    }
};
