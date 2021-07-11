import Tag          from "../../Internals/Tag";
import DXFManager   from "../../Internals/DXFManager";

export default class Block extends DXFManager {

    get handleToOwner() : string { return this._handleToOwner; }
    get blockName()     : string { return this._blockName; }

    set handleToOwner(value: string) { this._handleToOwner = value; }

    private readonly    _blockName      :   string;
    private             _handleToOwner  :   string;
    private readonly    _endBlockHandle :   string;

    public constructor(name: string) {
        super();
        this._blockName         = name;
        this._handleToOwner     = '0';
        this._endBlockHandle    = this.handleSeed();
    }
    
    public tags(): Tag[] {
        return [
            ...this.makeEntityType('BLOCK'),
            ...this.makeHandle(this.handle),
            ...this.makeStandard([[330, this.handleToOwner]]),
            ...this.subclassMarker('AcDbEntity'),
            ...this.makeLayer('0'),
            ...this.subclassMarker('AcDbBlockBegin'),
            ...this.makeName(this.blockName),
            ...this.makeStandard([[70, 0]]),
            ...this.makePoint(0, 0, 0, true),
            ...this.makeName(this.blockName, 3),
            ...this.makeStandard([[1, '']]),
            ...this.makeEntityType('ENDBLK'),
            ...this.makeHandle(this._endBlockHandle),
            ...this.makeStandard([[330, this.handleToOwner]]),
            ...this.subclassMarker('AcDbEntity'),
            ...this.makeLayer('0'),
            ...this.subclassMarker('AcDbBlockEnd')
        ];
    }
};
