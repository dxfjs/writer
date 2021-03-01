export default class DXFManager {
    static version: string;
    public constructor(version: string) {
        DXFManager.version = version
    }

    public isInteger(value: number): boolean {
        return Number(value) === value && value % 1 === 0;
    }

    public isFloat(value: number): boolean {
        return Number(value) === value && value % 1 !== 0;
    }

    public isSupported(version: string): boolean {
        const fileVersion = parseInt(DXFManager.version.replace('AC', ''));
        const tagVersion = parseInt(version.replace('AC', ''));
        return tagVersion <= fileVersion;
    }



};