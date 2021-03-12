import Tag          from "../Tag";
import DXFInterface from "../Interfaces/DXFInterface";

export default class HardPointerHandleComponent implements DXFInterface {
    get hardPointerHandleTag(): Tag {
        return this._hardPointerHandleTag;
    }
    private readonly _hardPointerHandleTag: Tag;
    public constructor(hardPointerHandle: string, digit: number) {
        this._hardPointerHandleTag = new Tag(parseInt(`34${digit}`), hardPointerHandle, 'AC1012');
    }

    stringify(): string {
        return this.hardPointerHandleTag.stringify();
    }

    tags(): Tag[] {
        return [this.hardPointerHandleTag];
    }

};
