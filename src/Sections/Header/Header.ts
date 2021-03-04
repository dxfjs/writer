import Variable     from "./Variable.js";
import Tag          from "../../Internals/Tag.js";
import DXFManager   from "../../Internals/DXFManager.js";

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

    public addVariable(name: string, group_code: number, value: number | string) {
        this._variables.push(new Variable(name, group_code, value));
    }

    public tags(): Tag[] {
        const tags = [
            ...new Variable('ACADVER', 1, DXFManager.version).tags(),
            ...new Variable('HANDSEED', 5, this.handleSeed()).tags(),
            ...new Variable('INSUNITS', 70, this.unit).tags()
        ];
        this.variables.forEach((variable) => {
            tags.push(...variable.tags());
        })
        return tags;
    }

    public stringify(): string {
        let str = '';
        str += this.entityType('SECTION').stringify();
        str += this.name('HEADER').stringify();
        str += this.tags().reduce((str, tag) => {
            return `${str}${tag.stringify()}`;
        }, '');
        str += this.entityType('ENDSEC').stringify();
        return str;
    }
}
