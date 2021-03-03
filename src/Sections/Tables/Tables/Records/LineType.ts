import Tag from "../../../../Internals/Tag.js";
import TagsManager from "../../../../Internals/TagsManager.js";

export default class LineType extends TagsManager {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    get name(): string {
        return this._name;
    }
    get descriptive(): string {
        return this._descriptive;
    }
    get elements(): number[] {
        return this._elements;
    }
    private readonly _name: string;
    private readonly _descriptive: string;
    private readonly _elements: number [];
    private _handleToOwner: string;
    public constructor(name: string, descriptive: string, elements: number []) {
        super();
        this._name = name;
        this._descriptive = descriptive;
        this._elements = elements;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'LTYPE'));
        tags.push(new Tag(5, this.handle()));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbSymbolTableRecord'));
        tags.push(new Tag(100, 'AcDbLinetypeTableRecord'));
        tags.push(new Tag(2, this.name));
        tags.push(new Tag(70, 0));
        tags.push(new Tag(3, this.descriptive));
        tags.push(new Tag(72, 65));
        tags.push(new Tag(73, this.elements.length));
        const sum = this.elements.reduce((sum, element) => {
            return sum + Math.abs(element);
        }, 0);
        tags.push(new Tag(40, sum));
        this.elements.forEach((element) => {
            tags.push(new Tag(49, element));
            tags.push(new Tag(74, 0));
        });
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }
};
