import Tag from "../Tag.js";
import DXFInterface from "../Interfaces/DXFInterface.js";

export default class TextStyleComponent implements DXFInterface {
    get textStyleName(): string {
        return this._textStyleName.value.toString();
    }
    set textStyleName(value: string) {
        this._textStyleName.value = value;
    }
    private readonly _textStyleName: Tag;
    public constructor(textStyleName: string) {
        this._textStyleName = new Tag(7, textStyleName);
    }
    stringify(): string {
        return this._textStyleName.stringify();
    }
    tags(): Tag[] {
        return [this._textStyleName];
    }
};
