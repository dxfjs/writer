import Tag                      from "../../Internals/Tag";
import DXFManager               from "../../Internals/DXFManager";

export default class Entity extends DXFManager {
    get subclass(): string {
        return this._subclass;
    }

    get type(): string {
        return this._type;
    }

    protected readonly _type: string;
    protected readonly _subclass: string;

    public constructor(type: string, subclass: string) {
        super();
        this._type = type;
        this._subclass = subclass;
    }

    public tags(): Tag[] {
        return [
            ...this.entityType(this.type),
            ...this.hand(this.handle),
            ...this.subclassMarker('AcDbEntity'),
            ...this.layer(DXFManager.currentLayer),
            ...this.subclassMarker(this.subclass)
        ];
    }
};
