import TagsManager from "../../../../Internals/TagsManager.js";
import Tag from "../../../../Internals/Tag.js";

export default class APPID extends TagsManager {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    get flag(): number {
        return this._flag;
    }
    get name(): string {
        return this._name;
    }
    private readonly _name: string;
    private readonly _flag: number;
    private _handleToOwner: string;
    public constructor(name: string, flag: number) {
        super();
        this._name = name;
        this._flag = flag;
        this._handleToOwner = '0';
    }

    tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'APPID'));
        tags.push(new Tag(5, this.handle()));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbSymbolTableRecord'));
        tags.push(new Tag(100, 'AcDbRegAppTableRecord'));
        tags.push(new Tag(2, this.name));
        tags.push(new Tag(70, this.flag));
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }

};
