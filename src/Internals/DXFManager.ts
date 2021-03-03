export default class DXFManager {
    get handle(): string {
        return this._handle;
    }
    set handle(value: string) {
        this._handle = value;
    }
    static versions = {
        R12:    "AC1009", R13:      "AC1012", R14:      "AC1014",
        R2000:  "AC1015", R2004:    "AC1018", R2007:    "AC1021",
        R2010:  "AC1024", R2013:    "AC1027", R2018:    "AC1032"
    };
    static version: string;
    static handleSeed: number = 0;
    private _handle: string;
    protected constructor(version: string) {
        DXFManager.version = version;
        this._handle = this.handleSeed();
    }
    protected isInteger(value: number): boolean {
        return Number(value) === value && value % 1 === 0;
    }
    protected isFloat(value: number): boolean {
        return Number(value) === value && value % 1 !== 0;
    }
    protected isSupported(version: string): boolean {
        const fileVersion = parseInt(DXFManager.version.replace('AC', ''));
        const tagVersion = parseInt(version.replace('AC', ''));
        return tagVersion <= fileVersion;
    }
    public handleSeed (): string
    {
        DXFManager.handleSeed++;
        return DXFManager.handleSeed.toString(16).toUpperCase();
    }
};
