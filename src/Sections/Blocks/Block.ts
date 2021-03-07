import Tag          from "../../Internals/Tag";
import DXFManager   from "../../Internals/DXFManager";

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
    private readonly _endBlockHandle: string;
    public constructor(name: string) {
        super();
        this._blockName         = name;
        this._handleToOwner     = '0';
        this._endBlockHandle    = this.handleSeed();
    }
    public tags(): Tag[] {
        return [
            ...this.entityType('BLOCK'),
            ...this.hand(this.handle),
            ...this.standard([[330, this.handleToOwner]]),
            ...this.subclassMarker('AcDbEntity'),
            ...this.layer('0'),
            ...this.subclassMarker('AcDbBlockBegin'),
            ...this.name(this.blockName),
            ...this.standard([[70, 0]]),
            ...this.point(0, 0, 0, true),
            ...this.name(this.blockName, 3),
            ...this.standard([[1, '']]),
            ...this.entityType('ENDBLK'),
            ...this.hand(this._endBlockHandle),
            ...this.standard([[330, this.handleToOwner]]),
            ...this.subclassMarker('AcDbEntity'),
            ...this.layer('0'),
            ...this.subclassMarker('AcDbBlockEnd')
        ];
    }
};
