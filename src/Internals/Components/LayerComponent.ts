import Tag          from    "../Tag";
import DXFInterface from    "../Interfaces/DXFInterface";

export default class LayerComponent implements DXFInterface
{
    get layer() : string { return this._layer.value.toString(); }

    set layer(value : string) { this._layer.value = value; }

    private readonly _layer : Tag;
    
    public constructor(layer : string) {
        this._layer = new Tag(8, layer);
    }
    stringify(): string {
        return this._layer.stringify();
    }

    tags(): Tag[] {
        return [this._layer];
    }

};
