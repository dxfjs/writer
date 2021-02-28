import Block from "./Block.js";
import Tag from "../../Internals/Tag.js";

export default class Blocks {
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
        this._blocks.push(new Block('*Model_Space'));
        this._blocks.push(new Block('*Paper_Space'));
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        this.blocks[0].handleToOwner = this.modelHandle;
        this.blocks[1].handleToOwner = this.paperHandle;
        this.blocks.forEach((block) => {
            tags.push(...block.tags());
        });
        return tags;
    }
    public stringify(): string {
        let str = '';
        str += new Tag(0, 'SECTION').stringify();
        str += new Tag(2, 'BLOCKS').stringify();
        str += this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
        str += new Tag(0, 'ENDSEC').stringify();
        return str;
    }
}