import Table        from "../Table";
import APPID        from "./Records/APPID";
import Tag          from "../../../Internals/Tag";

export default class APPIDTable extends Table {
    get appIDs(): APPID[] {
        return this._appIDs;
    }
    private _appIDs: APPID[] = [];
    public constructor() {
        super('APPID');
    }

    public addAPPID(name: string, flag: number) {
        this._appIDs.push(new APPID(name, flag));
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...super.tags());
        this.appIDs.forEach((appID) => {
            appID.handleToOwner = this.handle;
            tags.push(...appID.tags());
        });
        tags.push(...this.entityType('ENDTAB'));
        return tags;
    }
};
