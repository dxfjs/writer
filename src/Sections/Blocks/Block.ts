import Tag from "../../Internals/Tag.js";
import TagsManager from "../../Internals/TagsManager.js";

export default class Block extends TagsManager {
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
        tags.push(new Tag(0, 'BLOCK'));
        tags.push(new Tag(5, this.handle()));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbEntity'));
        tags.push(new Tag(8, '0'));
        tags.push(new Tag(100, 'AcDbBlockBegin'));
        tags.push(new Tag(2, this.name));
        tags.push(new Tag(70, 0));
        tags.push(new Tag(10, 0));
        tags.push(new Tag(20, 0));
        tags.push(new Tag(30, 0));
        tags.push(new Tag(3, this.name));
        tags.push(new Tag(1, ''));
        tags.push(new Tag(0, 'ENDBLK'));
        tags.push(new Tag(5, this.handle()));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbEntity'));
        tags.push(new Tag(8, '0'));
        tags.push(new Tag(100, 'AcDbBlockEnd'));
        return tags;
    }
};