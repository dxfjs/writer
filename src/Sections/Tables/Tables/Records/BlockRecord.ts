import Tag from "../../../../Internals/Tag.js";
import TagsManager from "../../../../Internals/TagsManager.js";

export default class BlockRecord extends TagsManager {
    get ownHandle(): string {
        return this._ownHandle;
    }

    set ownHandle(value: string) {
        this._ownHandle = value;
    }
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
    private _ownHandle: string;
    public constructor(name: string) {
        super();
        this._name = name;
        this._handleToOwner = '0';
        this._ownHandle = '0';
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'BLOCK_RECORD'));
        this.ownHandle = this.handle();
        tags.push(new Tag(5, this.ownHandle));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbSymbolTableRecord'));
        tags.push(new Tag(100, 'AcDbBlockTableRecord'));
        tags.push(new Tag(2, this.name));
        tags.push(new Tag(70, 0));
        tags.push(new Tag(280, 1));
        tags.push(new Tag(281, 0));
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }
}
