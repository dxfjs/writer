import Tag from "../../Internals/Tag.js";
import Standard from "../../Internals/Standard.js";
import EntityTypeComponent from "../../Internals/Components/EntityTypeComponent";
import LayerComponent from "../../Internals/Components/LayerComponent";
import SubclassMarkerComponent from "../../Internals/Components/SubclassMarkerComponent";

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
        let tags: Tag[] = [];
        tags.push(new Tag(0, this.type));
        tags.push(new Tag(5, this.handle()));
        tags.push(new Tag(100, 'AcDbEntity'));
        tags.push(new Tag(8, this.layer));
        tags.push(new Tag(100, this.subclass));
        return tags;
    }
}
