import Table        from "../Table";
import LineType     from "./Records/LineType";
import Tag          from "../../../Internals/Tag";

export default class LineTypeTable extends Table {
    get lineTypes(): LineType[] {
        return this._lineTypes;
    }
    private _lineTypes: LineType[] = [];
    public constructor() {
        super('LTYPE');
    }

    public addLineType(name: string, descriptive: string, elements: number []) {
        this._lineTypes.push(new LineType(name, descriptive, elements));
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...super.tags());
        this.lineTypes.forEach((lineType) => {
            lineType.handleToOwner = this.handle;
            tags = tags.concat(lineType.tags());
        });
        tags.push(...this.entityType('ENDTAB'));
        return tags;
    }
}
