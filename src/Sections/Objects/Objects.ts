import Dictionary from "./Objects/dictionary.js";
import Tag from "../../Internals/Tag.js";

// TODO make this class dynamic and add/support other Objects
export default class Objects {
    get dictionaries(): Dictionary[] {
        return this._dictionaries;
    }
    private _dictionaries: Dictionary[] = [];
    public constructor() {
        this._dictionaries.push(new Dictionary('ACAD_GROUP'))
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        this.dictionaries.forEach((dictionary) => {
            tags.push(...dictionary.tags());
        });
        return tags;
    }
    public stringify(): string {
        let str = '';
        str += new Tag(0, 'SECTION').stringify();
        str += new Tag(2, 'OBJECTS').stringify();
        str += this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
        str += new Tag(0, 'ENDSEC').stringify();
        return str;
    }
};
