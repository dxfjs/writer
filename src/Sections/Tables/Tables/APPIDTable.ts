import Tag from "../../../Internals/Tag.js";
import APPID from "./Records/APPID.js";
import Standard from "../../../Internals/Standard.js";

export default class APPIDTable extends Standard {
    get appIDs(): APPID[] {
        return this._appIDs;
    }
    private _appIDs: APPID[] = [];
    public constructor() {
        super();
    }

    public addAPPID(name: string, flag: number) {
        this._appIDs.push(new APPID(name, flag));
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'TABLE'));
        tags.push(new Tag(2, 'APPID'));
        const handle: string = this.handle();
        tags.push(new Tag(5, handle));
        tags.push(new Tag(330, 0));
        tags.push(new Tag(100, 'AcDbSymbolTable'));
        tags.push(new Tag(70, 1));
        this.appIDs.forEach((appID) => {
            appID.handleToOwner = handle;
            tags = tags.concat(appID.tags());
        });
        tags.push(new Tag(0, 'ENDTAB'));
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }
};
