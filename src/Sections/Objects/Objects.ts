import Tag          from "../../Internals/Tag.js";
import Dictionary   from "./Objects/dictionary.js";
import DXFManager   from "../../Internals/DXFManager.js";

// TODO make this class dynamic and add/support other Objects
export default class Objects extends DXFManager {
    get dictionaries(): Dictionary[] {
        return this._dictionaries;
    }
    private _dictionaries: Dictionary[] = [];
    public constructor() {
        super();
        this._dictionaries.push(new Dictionary('ACAD_GROUP'))
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...this.entityType('SECTION').tags());
        tags.push(...this.name('OBJECTS').tags());
        this.dictionaries.forEach((dictionary) => {
            tags.push(...dictionary.tags());
        });
        tags.push(...this.entityType('ENDSEC').tags());
        tags.push(...this.entityType('EOF').tags());
        return tags;
    }
    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }
};
