import Tag          from "../Tag";
import DXFInterface from "../Interfaces/DXFInterface";

export default class HardOwnerHandleComponent implements DXFInterface {
    get hardOwnerHandleTag(): Tag {
        return this._hardOwnerHandleTag;
    }
    private readonly _hardOwnerHandleTag: Tag;
    public constructor(hardOwnerHandle: string, digit: number) {
        this._hardOwnerHandleTag = new Tag(parseInt(`36${digit}`), hardOwnerHandle, 'AC1012');
    }

    stringify(): string {
        return this.hardOwnerHandleTag.stringify();
    }

    tags(): Tag[] {
        return [this.hardOwnerHandleTag];
    }

};
