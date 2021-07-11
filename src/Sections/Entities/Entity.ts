import Tag                      from "../../Internals/Tag";
import DXFManager               from "../../Internals/DXFManager";

export default class Entity extends DXFManager {
    get layerName(): string {
        return this._layerName;
    }
    get subClassName(): string {
        return this._subClassName;
    }

    get type(): string {
        return this._type;
    }

    protected readonly _type: string;
    protected readonly _subClassName: string;
    private readonly _layerName: string;
    public constructor(type: string, subclass: string) {
        super();
        this._type = type;
        this._subClassName = subclass;
        this._layerName = DXFManager.currentLayer;
    }

    public boundingBox(): number[][] {
        return [];
    }

    public tags(): Tag[] {
        return [
            ...this.makeEntityType(this.type),
            ...this.makeHandle(this.handle),
            ...this.subclassMarker('AcDbEntity'),
            ...this.makeLayer(this.layerName),
            ...this.subclassMarker(this.subClassName)
        ];
    }
};
