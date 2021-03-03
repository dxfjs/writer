import Tag from "../../../../Internals/Tag.js";
import TagsManager from "../../../../Internals/TagsManager.js";

export default class Layer extends TagsManager {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    get flag(): number {
        return this._flag;
    }
    get ltype(): string {
        return this._ltype;
    }
    get color(): number {
        return this._color;
    }
    get name(): string {
        return this._name;
    }
    private readonly _name: string;
    private readonly _color: number;
    private readonly _ltype: string;
    private readonly _flag: number;
    private _handleToOwner: string;
    public constructor(name: string, color: number, ltype: string, flag: number) {
        super();
        this._name = name;
        this._color = color;
        this._ltype = ltype;
        this._flag = flag;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'LAYER'));
        tags.push(new Tag(5, this.handle()));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbSymbolTableRecord'));
        tags.push(new Tag(100, 'AcDbLayerTableRecord'));
        tags.push(new Tag(2, this.name));
        tags.push(new Tag(70, this.flag));
        tags.push(new Tag(62, this.color));
        tags.push(new Tag(6, this.ltype));
        tags.push(new Tag(370, 0));
        tags.push(new Tag(390, '0')); // TODO add ACDBPLACEHOLDER Object to support this
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return `${str}${tag.stringify()}`;
        }, '');
    }
}
