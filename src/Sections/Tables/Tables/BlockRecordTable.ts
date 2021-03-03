import Tag from "../../../Internals/Tag.js";
import BlockRecord from "./Records/BlockRecord.js";
import Standard from "../../../Internals/Standard.js";

export default class BlockRecordTable extends Standard {
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
        super();
        this._blockRecords.push(new BlockRecord('*Model_Space'));
        this._blockRecords.push(new BlockRecord('*Paper_Space'));
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'TABLE'));
        tags.push(new Tag(2, 'BLOCK_RECORD'));
        const handle: string = this.handle();
        tags.push(new Tag(5, handle));
        tags.push(new Tag(330, 0));
        tags.push(new Tag(100, 'AcDbSymbolTable'));
        tags.push(new Tag(70, 2));
        this.blockRecords.forEach((block_record) => {
            block_record.handleToOwner = handle;
            tags = tags.concat(block_record.tags());
        });
        tags.push(new Tag(0, 'ENDTAB'));
        this.modelHandle = this.blockRecords[0].ownHandle;
        this.paperHandle = this.blockRecords[1].ownHandle;
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }

};
