import Tag from "../../../../Internals/Tag.js";
import TagsManager from "../../../../Internals/TagsManager.js";

export default class Style extends TagsManager {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    get name(): string {
        return this._name;
    }
    private readonly _name: string;
    private _handleToOwner: string;
    public constructor(name: string) {
        super();
        this._name = name;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'STYLE'));
        tags.push(new Tag(5, this.handle()));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbSymbolTableRecord'));
        tags.push(new Tag(100, 'AcDbTextStyleTableRecord'));
        tags.push(new Tag(2, this.name));
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