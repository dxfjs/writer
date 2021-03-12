import Tag          from "../../../../Internals/Tag";
import DXFManager   from "../../../../Internals/DXFManager";

export default class BlockRecord extends DXFManager {
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
        super();
        this._blockRecordName = name;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(
            ...this.entityType('BLOCK_RECORD'),
            ...this.hand(this.handle),
            ...this.softPointerHandle(this.handleToOwner),
            ...this.subclassMarker('AcDbSymbolTableRecord'),
            ...this.subclassMarker('AcDbBlockTableRecord'),
            ...this.name(this.blockRecordName),
            ...this.standard([[70, 0]]),
        );
        if (this.isSupported(DXFManager.versions.R13)) {
            tags.push(new Tag(280, 1));
            tags.push(new Tag(281, 0));
        }
        return tags;
    }
}
