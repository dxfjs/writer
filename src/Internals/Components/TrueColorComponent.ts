import Tag          from    "../Tag";
import DXFInterface from    "../Interfaces/DXFInterface";

export default class TrueColorComponent implements DXFInterface {
    get digit(): number {
        return this._digit;
    }
    set digit(value: number) {
        this._digit = value;
        this._color.groupCode = parseInt(`42${this.digit}`);
    }
    get red(): number {
        return this._red;
    }
    set red(value: number) {
        this._red = value;
        this._color.value = this.toDecimal();
    }
    get green(): number {
        return this._green;
    }
    set green(value: number) {
        this._green = value;
        this._color.value = this.toDecimal();
    }
    get blue(): number {
        return this._blue;
    }

    set blue(value: number) {
        this._blue = value;
    }
    private _red: number;
    private _green: number;
    private _blue: number;
    private _digit: number;
    private readonly _color: Tag;
    public constructor(red: number, green: number, blue: number, digit: number = 0) {
        this._red = red;
        this._green = green;
        this._blue = blue;
        this._digit = digit;
        this._color = new Tag(parseInt(`42${digit}`), this.toDecimal());
    }

    private toDecimal(): number {
        const red = String(this.red.toString(16).toUpperCase());
        const green = String(this.green.toString(16).toUpperCase());
        const blue = String(this.blue.toString(16).toUpperCase());
        return parseInt(`${red}${green}${blue}`, 16);
    }

    stringify(): string {
        return this._color.stringify();
    }

    tags(): Tag[] {
        return [this._color];
    }
};
