import Layer        from "./Records/Layer.js";
import Tag          from "../../../Internals/Tag.js";
import DXFManager   from "../../../Internals/DXFManager.js";

export default class LayerTable extends DXFManager {
    get layers(): Layer[] {
        return this._layers;
    }
    private _layers: Layer[] = [];
    public constructor() {
        super();
    }

    public addLayer(name: string, color: number, lineType: string, flag: number) {
        this._layers.push(new Layer(name, color, lineType, flag));
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'TABLE'));
        tags.push(new Tag(2, 'LAYER'));
        tags.push(new Tag(5, this.handle));
        tags.push(new Tag(330, 0));
        tags.push(new Tag(100, 'AcDbSymbolTable'));
        tags.push(new Tag(70, 1));
        this.layers.forEach((layer) => {
            layer.handleToOwner = this.handle;
            tags = tags.concat(layer.tags());
        });
        tags.push(new Tag(0, 'ENDTAB'));
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }
}
