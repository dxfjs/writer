import Point from './Point';
import Entity from '../Entity';
import Tag from '../../../Internals/Tag';

export default class Text extends Entity {
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
    public constructor(position: Point, height: number, value: string) {
        super('TEXT', 'AcDbText');
        this._position = position;
        this._height = height;
        this._value = value;
    }

    public boundingBox() {
        // I have no idea how to get boundingBox of TEXT :(
        return [
            [this.position.x, this.position.y],
            [this.position.x, this.position.y],
        ];
    }

    public tags(): Tag[] {
        return [
            ...super.tags(),
            ...this.makePoint(
                this.position.x,
                this.position.y,
                this.position.z,
                true
            ),
            ...this.makeStandard([
                [40, this.height],
                [1, this.value],
            ]),
            ...this.makeSubclassMarker('AcDbText'),
        ];
    }
}
