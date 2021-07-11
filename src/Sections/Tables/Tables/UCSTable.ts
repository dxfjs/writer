import Table        from "../Table";
import UCS          from "./Records/UCS";
import Tag          from "../../../Internals/Tag";

export default class UCSTable extends Table {
    get ucss(): UCS[] {
        return this._ucss;
    }
    private _ucss: UCS[] = [];
    public constructor() {
        super('UCS');
    }

    public addUCS() {
        this._ucss.push(new UCS());
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...super.tags());
        this.ucss.forEach((ucs) => {
            tags.push(...ucs.tags());
        });
        tags.push(...this.makeEntityType('ENDTAB'));
        return tags;
    }
};
