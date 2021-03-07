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
            ...this.entityType('STYLE'),
            ...this.hand(this.handle),
            ...this.standard([[330, this.handleToOwner]]),
            ...this.subclassMarker('AcDbSymbolTableRecord'),
            ...this.subclassMarker('AcDbTextStyleTableRecord'),
            ...this.name(this.styleName),
            ...this.standard([
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
