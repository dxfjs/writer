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
            ...this.entityType('TABLE'),
            ...this.name(this.tableName),
            ...this.hand(this.handle),
            ...this.softPointerHandle('0'),
            ...this.subclassMarker('AcDbSymbolTable'),
            ...this.standard([[70, 1]]),
        ];
    }
};
