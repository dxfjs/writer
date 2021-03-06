import handle                           from "./HandleSeed";
import versionHandler, {VersionHandler} from "./VersionHandler";
import Tag                              from "../Prototype/Tag";

export default  class DXFProcessor {
    get version(): string {
        return this._versionHandler.version;
    }
    get handle(): string {
        return this._handle;
    }

    set version(version: string) {
        this._versionHandler.version = version;
    }
    private readonly _handle: string;
    private readonly _versionHandler: VersionHandler;
    static versions = VersionHandler.versions;
    public constructor() {
        this._handle = handle.next();
        this._versionHandler = versionHandler
    }

    public isTagSupported(tag: Tag): boolean {
        return this._versionHandler.isSupported(tag.version);
    }

}