import Tag          from "../../../../Internals/Tag.js";
import DXFManager   from "../../../../Internals/DXFManager.js";
import DXFInterface from "../../../../Internals/Interfaces/DXFInterface.js";

export default class View extends DXFManager implements DXFInterface {
    public constructor() {
        super(DXFManager.version);
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return `${str}${tag.stringify()}`;
        }, '');
    }

    tags(): Tag[] {
        return [];
    }
}
