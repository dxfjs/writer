import Block        from "./Block";
import Tag          from "../../Internals/Tag";
import DXFManager   from "../../Internals/DXFManager";
import Tables       from "../Tables/Tables";

export default class Blocks extends DXFManager {

    get blocks()        : Block[]   { return this._blocks;          }
    get modelHandle()   : string    { return this._modelHandle;     }
    get paperHandle()   : string    { return this._paperHandle;     }
    get tables()        : Tables    { return this._tables;          }

    
    set modelHandle (value: string) { this._modelHandle = value;    }
    set paperHandle (value: string) { this._paperHandle = value;    }
    set tables      (value: Tables) { this._tables      = value;    }


    private _blocks         : Block[]   = [];
    private _modelHandle    : string    = '0';
    private _paperHandle    : string    = '0';
    private _tables         : Tables;

    public constructor() {
        super();
        this._tables = new Tables();
        this._blocks.push(new Block('*Model_Space'));
        this._blocks.push(new Block('*Paper_Space'));
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        const [modelSpace, paperSpace] = this._blocks;
        modelSpace.handleToOwner = this.tables.blockRecords.modelHandle;
        paperSpace.handleToOwner = this.tables.blockRecords.paperHandle;
        tags.push(...this.makeEntityType('SECTION'));
        tags.push(...this.makeName('BLOCKS'));
        this.blocks.forEach((block) => {
            tags.push(...block.tags());
        });
        tags.push(...this.makeEntityType('ENDSEC'));
        return tags;
    }
}
