import Tag from "../../../Internals/Tag.js";
import Layer from "./Records/Layer.js";
import Standard from "../../../Internals/Standard.js";

export default class LayerTable extends Standard {
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
        const handle: string = this.handle();
        tags.push(new Tag(5, handle));
        tags.push(new Tag(330, 0));
        tags.push(new Tag(100, 'AcDbSymbolTable'));
        tags.push(new Tag(70, 1));
        this.layers.forEach((layer) => {
            layer.handleToOwner = handle;
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