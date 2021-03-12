import Tag          from "../Tag";
import DXFInterface from "../Interfaces/DXFInterface";

export default class SoftPointerHandleComponent implements DXFInterface {
    get softPointerHandleTag(): Tag {
        return this._softPointerHandleTag;
    }
    private readonly _softPointerHandleTag: Tag;
    public constructor(softPointerHandle: string, digit: number) {
        this._softPointerHandleTag = new Tag(parseInt(`33${digit}`), softPointerHandle, 'AC1012');
    }

    stringify(): string {
        return this.softPointerHandleTag.stringify();
    }

    tags(): Tag[] {
        return [this.softPointerHandleTag];
    }

};
