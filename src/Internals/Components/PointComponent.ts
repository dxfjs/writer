import Tag from "../Tag.js";
import DXFInterface from "../Interfaces/DXFInterface.js";

export default class PointComponent implements DXFInterface{
    get digit(): number {
        return this._digit;
    }
    set digit(value: number) {
        if (value <= 8 && value >= 0) {
            this._digit = value;
            this._x.groupCode = parseInt(`1${this.digit}`);
            this._y.groupCode = parseInt(`2${this.digit}`);
            this._z.groupCode = parseInt(`3${this.digit}`);
        }
    }
    get z(): number {
        return parseInt(this._z.value.toString());
    }

    set z(value: number) {
        this._z.value = value;
    }
    get y(): number {
        return parseInt(this._y.value.toString());
    }
    set y(value: number) {
        this._y.value = value;
    }
    get x(): number {
        return parseInt(this._x.value.toString());
    }
    set x(value: number) {
        this._x.value = value;
    }
    private readonly _x: Tag;
    private readonly _y: Tag;
    private readonly _z: Tag;
    private _digit: number = 0;
    public constructor(
        x: number, y: number, z: number,
        is3D: boolean = false, digit: number = 0
    ) {
        this._x = new Tag(parseInt(`1${digit}`), x);
        this._y = new Tag(parseInt(`2${digit}`), y);
        this._z = new Tag(parseInt(`3${digit}`), z);
        this._digit = digit;
    }

    stringify(): string {
        let str = '';
        str += this._x.stringify();
        str += this._y.stringify();
        str += this._z.stringify();
        return str;
    }
    tags(): Tag[] {
        return [this._x, this._y, this._z];
    }
}
