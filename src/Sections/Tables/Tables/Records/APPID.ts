import Tag          from "../../../../Internals/Tag";
import DXFManager   from "../../../../Internals/DXFManager";

export default class APPID extends DXFManager {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    get flag(): number {
        return this._flag;
    }
    get appIDName(): string {
        return this._appIDName;
    }
    private readonly _appIDName: string;
    private readonly _flag: number;
    private _handleToOwner: string;
    public constructor(name: string, flag: number) {
        super();
        this._appIDName = name;
        this._flag = flag;
        this._handleToOwner = '0';
    }

    tags(): Tag[] {

        return [
            ...this.entityType('APPID'),
            ...this.hand(this.handle),
            ...this.softPointerHandle(this.handleToOwner),
            ...this.subclassMarker('AcDbSymbolTableRecord'),
            ...this.subclassMarker('AcDbRegAppTableRecord'),
            ...this.name(this.appIDName),
            ...this.standard([[70, this.flag]]),
        ];
    }

};
