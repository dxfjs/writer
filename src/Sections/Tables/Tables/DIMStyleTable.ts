import Tag from "../../../Internals/Tag.js";
import DIMStyle from "./Records/DIMStyle.js";
import Standard from "../../../Internals/Standard.js";

export default class DIMStyleTable extends Standard {
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
        const handle: string = this.handle();
        tags.push(new Tag(5, handle));
        tags.push(new Tag(330, 0));
        tags.push(new Tag(100, 'AcDbSymbolTable'));
        tags.push(new Tag(70, 1));
        tags.push(new Tag(100, 'AcDbDimStyleTable'));
        tags.push(new Tag(71, 1));
        this.dimStyles.forEach((dimstyle) => {
            dimstyle.handleToOwner = handle;
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
