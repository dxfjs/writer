import DIMStyle     from "./Records/DIMStyle.js";
import Tag          from "../../../Internals/Tag.js";
import DXFManager   from "../../../Internals/DXFManager.js";

export default class DIMStyleTable extends DXFManager {
    get dimStyles(): DIMStyle[] {
        return this._dimStyles;
    }
    private _dimStyles: DIMStyle[] = [];
    public constructor() {
        super();
    }

    public addDIMStyle(name: string, flag: number) {
        this._dimStyles.push(new DIMStyle(name, flag));
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'TABLE'));
        tags.push(new Tag(2, 'DIMSTYLE'));
        tags.push(new Tag(5, this.handle));
        tags.push(new Tag(330, 0));
        tags.push(new Tag(100, 'AcDbSymbolTable'));
        tags.push(new Tag(70, 1));
        tags.push(new Tag(100, 'AcDbDimStyleTable'));
        tags.push(new Tag(71, 1));
        this.dimStyles.forEach((dimstyle) => {
            dimstyle.handleToOwner = this.handle;
            tags = tags.concat(dimstyle.tags());
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
