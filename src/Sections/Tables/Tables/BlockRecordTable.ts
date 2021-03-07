import Table        from "../Table";
import BlockRecord  from "./Records/BlockRecord";
import Tag          from "../../../Internals/Tag";

export default class BlockRecordTable extends Table {
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
    get blockRecords(): BlockRecord[] {
        return this._blockRecords;
    }
    private _blockRecords: BlockRecord[] = [];
    private _modelHandle: string = '';
    private _paperHandle: string = '';
    public constructor() {
        super('BLOCK_RECORD');
        this._blockRecords.push(new BlockRecord('*Model_Space'));
        this._blockRecords.push(new BlockRecord('*Paper_Space'));
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...super.tags());
        this.blockRecords.forEach((block_record) => {
            block_record.handleToOwner = this.handle;
            tags = tags.concat(block_record.tags());
        });
        tags.push(...this.entityType('ENDTAB'));
        this.modelHandle = this.blockRecords[0].handle;
        this.paperHandle = this.blockRecords[1].handle;
        return tags;
    }
};
