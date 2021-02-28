import Tag from "../../Internals/Tag.js";
import Standard from "../../Internals/Standard.js";

export default class Entity extends Standard
{
    get subclass(): string {
        return this._subclass;
    }
    get layer(): string {
        return this._layer;
    }
    get type(): string {
        return this._type;
    }
    protected readonly _type: string;
    protected readonly _layer: string;
    protected readonly _subclass: string;
    public constructor(type: string, layer: string, subclass: string) {
        super();
        this._type = type;
        this._layer = layer;
        this._subclass = subclass;
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