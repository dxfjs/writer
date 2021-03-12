import Tag          from "../../../../Internals/Tag";
import DXFManager   from "../../../../Internals/DXFManager";

export default class LineType extends DXFManager{
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    get lineTypeName(): string {
        return this._lineTypeName;
    }
    get descriptive(): string {
        return this._descriptive;
    }
    get elements(): number[] {
        return this._elements;
    }
    private readonly _lineTypeName: string;
    private readonly _descriptive: string;
    private readonly _elements: number [];
    private _handleToOwner: string;
    public constructor(name: string, descriptive: string, elements: number []) {
        super();
        this._lineTypeName = name;
        this._descriptive = descriptive;
        this._elements = elements;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...this.entityType('LTYPE'));
        tags.push(...this.hand(this.handle));
        tags.push(...this.softPointerHandle(this.handleToOwner));
        tags.push(...this.subclassMarker('AcDbSymbolTableRecord'));
        tags.push(...this.subclassMarker('AcDbLinetypeTableRecord'));
        tags.push(...this.name(this.lineTypeName));
        tags.push(...this.standard([
            [70, 0],
            [3, this.descriptive],
            [72, 65],
            [73, this.elements.length],
        ]));
        const sum = this.elements.reduce((sum, element) => {
            return sum + Math.abs(element);
        }, 0);
        tags.push(...this.standard([[40, sum]]));
        this.elements.forEach((element) => {
            tags.push(...this.standard([[49, element]]));
            if (this.isSupported(DXFManager.versions.R2000)) {
                tags.push(...this.standard([[74, 0]]));
            }
        });
        return tags;
    }
};
