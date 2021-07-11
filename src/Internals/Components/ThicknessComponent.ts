import Tag          from    "../Tag";
import DXFInterface from    "../Interfaces/DXFInterface";

export default class ThicknessComponent implements DXFInterface {
    get thickness(): number {
        return parseInt(this._thickness.value.toString());
    }
    set thickness(value: number) {
        this._thickness.value = value;
    }
    private readonly _thickness: Tag;
    public constructor(thickness : number) {
        this._thickness = new Tag(39, thickness);
    }
    stringify(): string {
        return this._thickness.stringify();
    }
    tags(): Tag[] {
        return [this._thickness];
    }
};
