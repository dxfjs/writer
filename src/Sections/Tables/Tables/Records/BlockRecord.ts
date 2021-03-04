import Tag          from "../../../../Internals/Tag.js";
import DXFManager   from "../../../../Internals/DXFManager.js";
import DXFInterface from "../../../../Internals/Interfaces/DXFInterface.js";

export default class BlockRecord extends DXFManager implements DXFInterface {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    get blockRecordName(): string {
        return this._blockRecordName;
    }
    private readonly _blockRecordName: string;
    private _handleToOwner: string;
    public constructor(name: string) {
        super(DXFManager.version);
        this._blockRecordName = name;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'BLOCK_RECORD'));
        tags.push(new Tag(5, this.handle));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbSymbolTableRecord'));
        tags.push(new Tag(100, 'AcDbBlockTableRecord'));
        tags.push(new Tag(2, this.blockRecordName));
        tags.push(new Tag(70, 0));
        tags.push(new Tag(280, 1));
        tags.push(new Tag(281, 0));
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }
}
