import Variable     from    "./Variable";
import Entities     from    "../Entities/Entities";
import Tag          from    "../../Internals/Tag";
import DXFManager   from    "../../Internals/DXFManager";

export default class Header extends DXFManager
{
    get entities  () : Entities   { return this._entities;  }
    get unit      () : number     { return this._unit;      }
    get variables () : Variable[] { return this._variables; }

    set entities (value : Entities) { this._entities    = value; }
    set unit     (value : number)   { this._unit        = value; }

    private _unit       : number;
    private _variables  : Variable[] = [];
    private _entities   : Entities;

    public constructor(unit: number = DXFManager.units.Unitless)
    {
        super();
        this._unit     = unit;
        this._entities = new Entities();
    }

    public addVariable(variable_name : string, values : [number, (number | string)][])
    {
        this._variables.push(new Variable(variable_name, values));
    }

    public tags() : Tag[]
    {
        const [x, y] = this.entities.centerView();
        const tags = [
            ...this.makeEntityType('SECTION'),
            ...this.makeName('HEADER'),
            ...new Variable('ACADVER'   , [[1, DXFManager.version]]).tags(),
            ...new Variable('HANDSEED'  , [[5, this.handleSeed()]]).tags(),
            ...new Variable('INSUNITS'  , [[70, this.unit]]).tags(),
            ...new Variable('VIEWCTR'   , [[10, x], [20, y]]).tags()
        ];
        this.variables.forEach((variable) => {
            tags.push(...variable.tags());
        })
        tags.push(...this.makeEntityType('ENDSEC'));
        return tags;
    }
}
