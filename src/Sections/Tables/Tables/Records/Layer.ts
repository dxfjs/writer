import Tag          from "../../../../Internals/Tag";
import DXFManager   from "../../../../Internals/DXFManager";

export default class Layer extends DXFManager {
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
        super();
        this._layerName = name;
        this._colorIndex = color;
        this._ltype = ltype;
        this._flag = flag;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        const tags: Tag[] =  [
            ...this.entityType('LAYER'),
            ...this.hand(this.handle),
            ...this.softPointerHandle(this.handleToOwner),
            ...this.subclassMarker('AcDbSymbolTableRecord'),
            ...this.subclassMarker('AcDbLayerTableRecord'),
            ...this.name(this.layerName),
            ...this.standard([
                [70, this.flag],
                [62, this.colorIndex],
                [6, this.ltype]
            ]),
        ];
        if (this.isSupported(DXFManager.versions.R13)) {
            tags.push(...this.standard([[370, 0]]));
            tags.push(...this.hardPointerHandle('0')); // TODO add ACDBPLACEHOLDER Object to support this
        }
        return tags;
    }
}
