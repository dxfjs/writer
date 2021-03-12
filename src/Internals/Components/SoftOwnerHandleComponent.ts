import Tag          from "../Tag";
import DXFInterface from "../Interfaces/DXFInterface";

export default class SoftOwnerHandleComponent implements DXFInterface {
    get softOwnerHandleTag(): Tag {
        return this._softOwnerHandleTag;
    }
    private readonly _softOwnerHandleTag: Tag;
    public constructor(softOwnerHandle: string, digit: number) {
        this._softOwnerHandleTag = new Tag(parseInt(`35${digit}`), softOwnerHandle, 'AC1012');
    }

    stringify(): string {
        return this.softOwnerHandleTag.stringify();
    }

    tags(): Tag[] {
        return [this.softOwnerHandleTag];
    }

};
