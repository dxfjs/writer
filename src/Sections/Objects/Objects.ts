import Tag          from "../../Internals/Tag";
import Dictionary   from "./Objects/dictionary";
import DXFManager   from "../../Internals/DXFManager";

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
        tags.push(...this.entityType('SECTION'));
        tags.push(...this.name('OBJECTS'));
        this.dictionaries.forEach((dictionary) => {
            tags.push(...dictionary.tags());
        });
        tags.push(...this.entityType('ENDSEC'));
        tags.push(...this.entityType('EOF'));
        return tags;
    }
};
