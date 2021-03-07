import Block        from "./Block";
import Tag          from "../../Internals/Tag";
import DXFManager   from "../../Internals/DXFManager";

export default class Blocks extends DXFManager {
    get paperHandle(): string {
        return this._paperHandle;
    }

    set paperHandle(value: string) {
        this._paperHandle = value;
    }
    get modelHandle(): string {
        return this._modelHandle;
    }

    set modelHandle(value: string) {
        this._modelHandle = value;
    }
    get blocks(): Block[] {
        return this._blocks;
    }
    private _blocks: Block[] = [];
    private _modelHandle: string = '0';
    private _paperHandle: string = '0';
    public constructor() {
        super();
        this._blocks.push(new Block('*Model_Space'));
        this._blocks.push(new Block('*Paper_Space'));
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        const [modelSpace, paperSpace] = this._blocks;
        modelSpace.handleToOwner = this.modelHandle;
        paperSpace.handleToOwner = this.paperHandle;
        tags.push(...this.entityType('SECTION'));
        tags.push(...this.name('BLOCKS'));
        this.blocks.forEach((block) => {
            tags.push(...block.tags());
        });
        tags.push(...this.entityType('ENDSEC'));
        return tags;
    }
}
