import Tag from "../../Internals/Tag.js";
import DXFManager from "../../Internals/DXFManager.js";

export default class Block extends DXFManager {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    get blockName(): string {
        return this._blockName;
    }
    private readonly _blockName: string;
    private _handleToOwner: string;
    public constructor(name: string) {
        super(DXFManager.version);
        this._blockName = name;
        this._handleToOwner = '0';
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'BLOCK'));
        tags.push(new Tag(5, this.handleSeed()));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbEntity'));
        tags.push(new Tag(8, '0'));
        tags.push(new Tag(100, 'AcDbBlockBegin'));
        tags.push(new Tag(2, this.blockName));
        tags.push(new Tag(70, 0));
        tags.push(new Tag(10, 0));
        tags.push(new Tag(20, 0));
        tags.push(new Tag(30, 0));
        tags.push(new Tag(3, this.blockName));
        tags.push(new Tag(1, ''));
        tags.push(new Tag(0, 'ENDBLK'));
        tags.push(new Tag(5, this.handleSeed()));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbEntity'));
        tags.push(new Tag(8, '0'));
        tags.push(new Tag(100, 'AcDbBlockEnd'));
        return tags;
    }
};
