import Tag                      from "../../Internals/Tag.js";
import DXFManager               from "../../Internals/DXFManager.js";
import DXFInterface             from "../../Internals/Interfaces/DXFInterface.js";
import LayerComponent           from "../../Internals/Components/LayerComponent.js";
import EntityTypeComponent      from "../../Internals/Components/EntityTypeComponent.js";
import SubclassMarkerComponent  from "../../Internals/Components/SubclassMarkerComponent.js";

export default class Entity extends DXFManager implements DXFInterface {
    get subclass(): string {
        return this._subclass.subclass;
    }

    get layerName(): string {
        return this._layerName.layer;
    }

    get type(): string {
        return this._type.name;
    }

    protected readonly _type: EntityTypeComponent;
    protected readonly _layerName: LayerComponent;
    protected readonly _subclass: SubclassMarkerComponent;

    public constructor(type: string, layer: string, subclass: string) {
        super(DXFManager.version);
        this._type = this.entityType(type);
        this._layerName = this.layer(layer);
        this._subclass = this.subclassMarker(subclass);
    }

    stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }

    public tags(): Tag[] {
        return [
            ...this._type.tags(),
            ...this.hand(this.handleSeed()).tags(),
            ...this.subclassMarker('AcDbEntity').tags(),
            ...this._layerName.tags(),
            ...this._subclass.tags()
        ];
    }
};
