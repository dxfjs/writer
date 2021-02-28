import Variable from "./Variable.js";
import Tag from "../../Internals/Tag.js";

export default class Header {
    get variables(): Variable[] {
        return this._variables;
    }
    get version(): string {
        return this._version;
    }
    get handSeed(): string {
        return this._handSeed;
    }
    set handSeed(value: string) {
        this._handSeed = value;
    }
    private readonly _version: string;
    private _handSeed: string;

    private _variables: Variable[] = [];
    public constructor(version: string) {
        this._version = version;
        this._handSeed = '999999';
    }

    public addVariable(name: string, group_code: number, value: number | string) {
        this._variables.push(new Variable(name, group_code, value));
    }

    public tags(): Tag[] {
        const tags = [
            ...new Variable('ACADVER', 1, this.version).tags(),
            ...new Variable('HANDSEED', 5, this.handSeed).tags()
        ];
        this.variables.forEach((variable) => {
            tags.push(...variable.tags());
        })
        return tags;
    }

    public stringify(): string {
        let str = '';
        str += new Tag(0, 'SECTION').stringify();
        str += new Tag(2, 'HEADER').stringify();
        str += this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
        str += new Tag(0, 'ENDSEC').stringify();
        return str;
    }
}