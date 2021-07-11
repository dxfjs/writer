import Tag          from    "../../../../Internals/Tag";
import DXFManager   from    "../../../../Internals/DXFManager";

export default class LineType extends DXFManager
{

    get lineTypeName    () : string     { return this._lineTypeName;    }
    get descriptive     () : string     { return this._descriptive;     }
    get elements        () : number[]   { return this._elements;        }
    get handleToOwner   () : string     { return this._handleToOwner;   }
    
    set handleToOwner (value : string) { this._handleToOwner = value; }

    private readonly    _lineTypeName   : string;
    private readonly    _descriptive    : string;
    private readonly    _elements       : number [];
    private             _handleToOwner  : string;

    public constructor(name: string, descriptive: string, elements: number []) {
        super();
        this._lineTypeName  = name;
        this._descriptive   = descriptive;
        this._elements      = elements;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...this.makeEntityType('LTYPE'));
        tags.push(...this.makeHandle(this.handle));
        tags.push(...this.makeStandard([[330, this.handleToOwner]]));
        tags.push(...this.makeSubclassMarker('AcDbSymbolTableRecord'));
        tags.push(...this.makeSubclassMarker('AcDbLinetypeTableRecord'));
        tags.push(...this.makeName(this.lineTypeName));
        tags.push(...this.makeStandard([
            [70, 0],
            [3, this.descriptive],
            [72, 65],
            [73, this.elements.length],
        ]));
        const sum = this.elements.reduce((sum, element) => {
            return sum + Math.abs(element);
        }, 0);
        tags.push(...this.makeStandard([[40, sum]]));
        this.elements.forEach((element) => {
            tags.push(...this.makeStandard([
                [49, element],
                [74, 0],
            ]));
        });
        return tags;
    }
};
