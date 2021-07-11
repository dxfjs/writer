import Tag          from "../../../../Internals/Tag";
import DXFManager   from "../../../../Internals/DXFManager";

export default class Style extends DXFManager {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    get styleName(): string {
        return this._styleName;
    }
    private readonly _styleName: string;
    private _handleToOwner: string;
    public constructor(name: string) {
        super();
        this._styleName = name;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        return [
            ...this.makeEntityType('STYLE'),
            ...this.makeHandle(this.handle),
            ...this.makeStandard([[330, this.handleToOwner]]),
            ...this.makeSubclassMarker('AcDbSymbolTableRecord'),
            ...this.makeSubclassMarker('AcDbTextStyleTableRecord'),
            ...this.makeName(this.styleName),
            ...this.makeStandard([
                [70, 0], [40, 0], [41, 1],
                [50, 0], [71, 0], [42, 1],
                [3, 'txt'], [4, '']
            ])
        ];
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return `${str}${tag.stringify()}`;
        }, '');
    }
}
