import Tag from "../../Internals/Tag";
import DXFManager from "../../Internals/DXFManager";

export default class Classes extends DXFManager {
    public constructor() {
        super();
    }

    public tags(): Tag[] {
        if (this.isSupported(DXFManager.versions.R13)) {
            return [
                ...this.entityType('SECTION'),
                ...this.name('CLASSES'),
                ...this.entityType('ENDSEC')
            ];
        }
        return [];
    }
};
