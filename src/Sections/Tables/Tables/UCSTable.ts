import UCS          from "./Records/UCS.js";
import Tag          from "../../../Internals/Tag.js";
import DXFManager   from "../../../Internals/DXFManager.js";

export default class UCSTable extends DXFManager {
    get ucss(): UCS[] {
        return this._ucss;
    }
    private _ucss: UCS[] = [];
    public constructor() {
        super(DXFManager.version);
    }

    public addUCS() {
        this._ucss.push(new UCS());
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'TABLE'));
        tags.push(new Tag(2, 'UCS'));
        tags.push(new Tag(5, this.handle));
        tags.push(new Tag(330, 0));
        tags.push(new Tag(100, 'AcDbSymbolTable'));
        tags.push(new Tag(70, 0));
        this.ucss.forEach((ucs) => {
            tags = tags.concat(ucs.tags());
        });
        tags.push(new Tag(0, 'ENDTAB'));
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }
};
