import Tag          from    "../../Internals/Tag";
import DXFManager   from    "../../Internals/DXFManager";

export default class Classes extends DXFManager {
    public constructor() {
        super();
    }

    public tags(): Tag[] {
        return [
            ...this.makeEntityType('SECTION'),
            ...this.makeName('CLASSES'),
            ...this.makeEntityType('ENDSEC')
        ];
    }
};
