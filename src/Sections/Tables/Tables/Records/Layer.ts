import Tag          from    "../../../../Internals/Tag";
import DXFManager   from    "../../../../Internals/DXFManager";

export default class Layer extends DXFManager
{
    get layerName     () : string { return this._layer_name;      }
    get colorIndex    () : number { return this._color_index;     }
    get lineType      () : string { return this._line_type;       }
    get flag          () : number { return this._flag;            }
    get handleToOwner () : string { return this._handle_to_owner; }
    
    set handleToOwner(value : string) { this._handle_to_owner = value; }
    
    private readonly _layer_name      : string;
    private readonly _color_index     : number;
    private readonly _line_type       : string;
    private readonly _flag            : number;
    private          _handle_to_owner : string;

    public constructor(name: string, color: number, ltype: string, flag: number) {
        super();

        this._layer_name      = name;
        this._color_index     = color;
        this._line_type       = ltype;
        this._flag            = flag;
        this._handle_to_owner = '0';

    }

    public tags() : Tag[]
    {
        return [
            ...this.makeEntityType('LAYER'),
            ...this.makeHandle(this.handle),
            ...this.makeStandard([[330, this.handleToOwner]]),
            ...this.makeSubclassMarker('AcDbSymbolTableRecord'),
            ...this.makeSubclassMarker('AcDbLayerTableRecord'),
            ...this.makeName(this.layerName),
            ...this.makeStandard([
                [70  , this.flag],
                [62  , this.colorIndex],
                [6   , this.lineType],
                [370 , 0],
                [390 , '0'], // TODO add ACDBPLACEHOLDER Object to support this
            ]),
        ];
    }
}
