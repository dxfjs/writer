import Tag                      from "../../Internals/Tag";
import DXFManager               from "../../Internals/DXFManager";

export default class Entity extends DXFManager {
    get layerName(): string {
        return this._layerName;
    }
    get subclass(): string {
        return this._subclass;
    }

    get type(): string {
        return this._type;
    }

    protected readonly _type: string;
    protected readonly _subclass: string;
    private readonly _layerName: string;
    public constructor(type: string, subclass: string) {
        super();
        this._type = type;
        this._subclass = subclass;
        this._layerName = DXFManager.currentLayer;
    }

    public tags(): Tag[] {
        return [
            ...this.entityType(this.type),
            ...this.hand(this.handle),
            ...this.subclassMarker('AcDbEntity'),
            ...this.layer(this.layerName),
            ...this.subclassMarker(this.subclass)
        ];
    }
};
