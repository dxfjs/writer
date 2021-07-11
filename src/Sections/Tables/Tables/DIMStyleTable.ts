import Table        from "../Table";
import DIMStyle     from "./Records/DIMStyle";
import Tag          from "../../../Internals/Tag";

export default class DIMStyleTable extends Table {
    get dimStyles(): DIMStyle[] {
        return this._dimStyles;
    }
    private _dimStyles: DIMStyle[] = [];
    public constructor() {
        super('DIMSTYLE');
    }

    public addDIMStyle(name: string, flag: number) {
        this._dimStyles.push(new DIMStyle(name, flag));
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...super.tags());
        tags.push(...this.subclassMarker('AcDbDimStyleTable'));
        tags.push(...this.makeStandard([[71, 1]]));
        this.dimStyles.forEach((dimstyle) => {
            dimstyle.handleToOwner = this.handle;
            tags = tags.concat(dimstyle.tags());
        });
        tags.push(...this.makeEntityType('ENDTAB'));
        return tags;
    }
};
