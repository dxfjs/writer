import Variable     from "./Variable";
import Tag          from "../../Internals/Tag";
import DXFManager   from "../../Internals/DXFManager";

export default class Header extends DXFManager {
    get unit(): number {
        return this._unit;
    }
    set unit(value: number) {
        this._unit = value;
    }
    get variables(): Variable[] {
        return this._variables;
    }
    private _unit: number;
    private _variables: Variable[] = [];
    public constructor(unit: number = DXFManager.units.Unitless) {
        super();
        this._unit = unit;
    }

    public addVariable(variableName: string, values: [number, (number | string)][]) {
        this._variables.push(new Variable(variableName, values));
    }

    public tags(): Tag[] {
        const tags = [
            ...this.entityType('SECTION'),
            ...this.name('HEADER'),
            ...new Variable('ACADVER', [[1, DXFManager.version]]).tags(),
            ...new Variable('HANDSEED', [[5, this.handleSeed()]]).tags(),
            ...new Variable('INSUNITS', [[70, this.unit]]).tags()
        ];
        this.variables.forEach((variable) => {
            tags.push(...variable.tags());
        })
        tags.push(...this.entityType('ENDSEC'));
        return tags;
    }
}
