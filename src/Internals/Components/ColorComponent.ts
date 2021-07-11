import Tag          from    "../Tag";
import DXFInterface from    "../Interfaces/DXFInterface";

export default class ColorComponent implements DXFInterface
{
    get index() : number { return parseInt(this._index.value.toString()); }

    set index(value : number) { this._index.value = value; }

    private readonly _index : Tag;

    public constructor(index : number) { this._index = new Tag(62, index); }

    stringify() : string {return this._index.stringify(); }

    tags() : Tag[] { return [this._index]; }

}
