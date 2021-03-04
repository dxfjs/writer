import LineType     from "./Records/LineType.js";
import Tag          from "../../../Internals/Tag.js";
import DXFManager   from "../../../Internals/DXFManager.js";

export default class LineTypeTable extends DXFManager {
    get lineTypes(): LineType[] {
        return this._lineTypes;
    }
    private _lineTypes: LineType[] = [];
    public constructor() {
        super();
    }

    public addLineType(name: string, descriptive: string, elements: number []) {
        this._lineTypes.push(new LineType(name, descriptive, elements));
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'TABLE'));
        tags.push(new Tag(2, 'LTYPE'));
        tags.push(new Tag(5, this.handle));
        tags.push(new Tag(330, 0));
        tags.push(new Tag(100, 'AcDbSymbolTable'));
        tags.push(new Tag(70, 4));
        this.lineTypes.forEach((lineType) => {
            lineType.handleToOwner = this.handle;
            tags = tags.concat(lineType.tags());
        });
        tags.push(new Tag(0, 'ENDTAB'));
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }
}
