import Point from "./Point.js";
import Entity from "../Entity.js";
import Tag from "../../../Internals/Tag.js";

export default class Text extends Entity
{
    get value(): string {
        return this._value;
    }
    get height(): number {
        return this._height;
    }
    get position(): Point {
        return this._position;
    }
    private readonly _position: Point;
    private readonly _height: number;
    private readonly _value: string;
    public constructor(
        position: Point, height: number, value: string,layer: string
    )
    {
        super('TEXT', layer, 'AcDbText')
        this._position = position;
        this._height = height;
        this._value = value;

    }

    public tags(): Tag[] {
        let tags: Tag[] = super.tags();
        tags.push(new Tag(10, this.position.x));
        tags.push(new Tag(20, this.position.y));
        tags.push(new Tag(30, this.position.z));
        tags.push(new Tag(40, this.height));
        tags.push(new Tag(1, this.value));
        tags.push(new Tag(100, 'AcDbText'));
        return tags;
    }
}
