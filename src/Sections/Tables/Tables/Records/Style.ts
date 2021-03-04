import Tag          from "../../../../Internals/Tag.js";
import DXFManager   from "../../../../Internals/DXFManager.js";
import DXFInterface from "../../../../Internals/Interfaces/DXFInterface.js";

export default class Style extends DXFManager implements DXFInterface {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    get styleName(): string {
        return this._styleName;
    }
    private readonly _styleName: string;
    private _handleToOwner: string;
    public constructor(name: string) {
        super(DXFManager.version);
        this._styleName = name;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'STYLE'));
        tags.push(new Tag(5, this.handle));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbSymbolTableRecord'));
        tags.push(new Tag(100, 'AcDbTextStyleTableRecord'));
        tags.push(new Tag(2, this.styleName));
        tags.push(new Tag(70, 0));
        tags.push(new Tag(40, 0));
        tags.push(new Tag(41, 1));
        tags.push(new Tag(50, 0));
        tags.push(new Tag(71, 0));
        tags.push(new Tag(42, 1));
        tags.push(new Tag(3, 'txt'));
        tags.push(new Tag(4, ''));
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return `${str}${tag.stringify()}`;
        }, '');
    }
}
