import Tag          from "../../Internals/Tag";
import DXFManager   from "../../Internals/DXFManager";

export default class Table extends DXFManager {
    get tableName(): string {
        return this._tableName;
    }
    public constructor(private _tableName: string) {
        super();
    }

    tags(): Tag[] {
        return [
            ...this.makeEntityType('TABLE'),
            ...this.makeName(this.tableName),
            ...this.makeHandle(this.handle),
            ...this.makeStandard([[330, 0]]),
            ...this.subclassMarker('AcDbSymbolTable'),
            ...this.makeStandard([[70, 1]]),
        ];
    }
};
