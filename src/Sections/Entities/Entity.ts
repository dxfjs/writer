import Tag                      from "../../Internals/Tag.js";
import Standard                 from "../../Internals/Standard.js";
import LayerComponent           from "../../Internals/Components/LayerComponent.js";
import HandleComponent          from "../../Internals/Components/HandleComponent.js";
import EntityTypeComponent      from "../../Internals/Components/EntityTypeComponent.js";
import SubclassMarkerComponent  from "../../Internals/Components/SubclassMarkerComponent.js";

export default class Entity extends Standard
{
    get subclass(): string {
        return this._subclass.subclass;
    }
    get layer(): string {
        return this._layer.layer;
    }
    get type(): string {
        return this._type.name;
    }
    protected readonly _type: EntityTypeComponent;
    protected readonly _layer: LayerComponent;
    protected readonly _subclass: SubclassMarkerComponent;
    public constructor(type: string, layer: string, subclass: string) {
        super();
        this._type = new EntityTypeComponent(type);
        this._layer = new LayerComponent(layer);
        this._subclass = new SubclassMarkerComponent(subclass);
    }

    public tags(): Tag[] {
        return [
            ...this._type.tags(),
            ...new HandleComponent(this.handle()).tags(),
            ...new SubclassMarkerComponent('AcDbEntity').tags(),
            ...this._layer.tags(),
            ...this._subclass.tags()
        ];
    }
}
