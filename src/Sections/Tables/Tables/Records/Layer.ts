import Tag          from "../../../../Internals/Tag.js";
import DXFManager   from "../../../../Internals/DXFManager.js";
import DXFInterface from "../../../../Internals/Interfaces/DXFInterface.js";

export default class Layer extends DXFManager implements DXFInterface {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    get flag(): number {
        return this._flag;
    }
    get ltype(): string {
        return this._ltype;
    }
    get colorIndex(): number {
        return this._colorIndex;
    }
    get layerName(): string {
        return this._layerName;
    }
    private readonly _layerName: string;
    private readonly _colorIndex: number;
    private readonly _ltype: string;
    private readonly _flag: number;
    private _handleToOwner: string;
    public constructor(name: string, color: number, ltype: string, flag: number) {
        super(DXFManager.version);
        this._layerName = name;
        this._colorIndex = color;
        this._ltype = ltype;
        this._flag = flag;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'LAYER'));
        tags.push(new Tag(5, this.handle));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbSymbolTableRecord'));
        tags.push(new Tag(100, 'AcDbLayerTableRecord'));
        tags.push(new Tag(2, this.layerName));
        tags.push(new Tag(70, this.flag));
        tags.push(new Tag(62, this.colorIndex));
        tags.push(new Tag(6, this.ltype));
        tags.push(new Tag(370, 0));
        tags.push(new Tag(390, '0')); // TODO add ACDBPLACEHOLDER Object to support this
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return `${str}${tag.stringify()}`;
        }, '');
    }
}
