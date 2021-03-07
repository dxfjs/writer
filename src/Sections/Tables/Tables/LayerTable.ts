import Table        from "../Table";
import Layer        from "./Records/Layer";
import Tag          from "../../../Internals/Tag";

export default class LayerTable extends Table {
    get layers(): Layer[] {
        return this._layers;
    }
    private _layers: Layer[] = [];
    public constructor() {
        super('LAYER');
    }

    public addLayer(name: string, color: number, lineType: string, flag: number) {
        this._layers.push(new Layer(name, color, lineType, flag));
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...super.tags());
        this.layers.forEach((layer) => {
            layer.handleToOwner = this.handle;
            tags = tags.concat(layer.tags());
        });
        tags.push(...this.entityType('ENDTAB'));
        return tags;
    }
}
