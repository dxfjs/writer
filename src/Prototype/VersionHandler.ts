export class VersionHandler {
    set version(value: string) {
        this._version = value;
    }
    get version(): string {
        return this._version;
    }
    static versions = {
        R12:    "AC1009", R13:      "AC1012", R14:      "AC1014",
        R2000:  "AC1015", R2004:    "AC1018", R2007:    "AC1021",
        R2010:  "AC1024", R2013:    "AC1027", R2018:    "AC1032"
    };
    static instance: VersionHandler;
    private _version: string;
    public constructor() {
        this._version = VersionHandler.versions.R2007
    }

    static getInstance() {
        if (VersionHandler.instance) return VersionHandler.instance;
        VersionHandler.instance = new VersionHandler();
        return VersionHandler.instance;
    }
    public isSupported(version: string): boolean {
        const currentVersion = parseInt(VersionHandler.instance.version.replace('AC', ''));
        const tagVersion = parseInt(version.replace('AC', ''));
        return tagVersion <= currentVersion;
    }
}

const versionHandler = VersionHandler.getInstance();
Object.freeze(VersionHandler);
export default versionHandler;
