import Tag from "./Tag.js";

export default class Standard
{
    static versions = {
        R12: "AC1009",
        R13: "AC1012",
        R14: "AC1014",
        R2000: "AC1015",
        R2004: "AC1018",
        R2007: "AC1021",
        R2010: "AC1024",
        R2013: "AC1027",
        R2018: "AC1032"
    };
    protected _version: string;
    static handleSeed: number = 0;

    protected constructor(version: string = Standard.versions.R12)
    {
        this._version = version;
    }

    public supportedVersion (version: string): boolean
    {
        const current = parseInt(this._version.replace('AC', ''));
        const ver = parseInt(version.replace('AC', ''));
        return ver <= current;
    }

    get version (): string { return this._version; }
    set version (version: string) { this._version = version; }

    public handle (): string
    {
        Standard.handleSeed++;
        return Standard.handleSeed.toString(16).toUpperCase();
    }
}