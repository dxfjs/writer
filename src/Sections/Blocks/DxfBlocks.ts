import DxfBlock from './DxfBlock';
import DxfTables from '../Tables/DxfTables';
import Handle from '../../Internals/Handle';
import TagsManager, { tag_t } from '../../Internals/TagsManager';

export default class DxfBlocks extends Handle {
	private _papersSeed: number = -1;

	private readonly _blocks: DxfBlock[] = [];
	private readonly _modelSpace: DxfBlock;
	private readonly _papersSpace: DxfBlock[] = [];
	private readonly _tables: DxfTables;

	get blocks(): DxfBlock[] {
		return this._blocks;
	}

	get tables(): DxfTables {
		return this._tables;
	}

	public get modelSpace(): DxfBlock {
		return this._modelSpace;
	}

	public constructor() {
		super();
		this._tables = new DxfTables();
		const modelSpaceBlock = this.tables.addBlockRecord('*Model_Space');
		this._modelSpace = this.addBlock('*Model_Space');
		this._modelSpace.softPointer = modelSpaceBlock.handle;
		this.addPaper();
	}

	public addBlock(name: string) {
		const block = new DxfBlock(name);
		this._blocks.push(block);
		return block;
	}

	public addPaper() {
		const count = ++this._papersSeed === 0 ? '' : this._papersSeed - 1;
		const paperBlock = this.tables.addBlockRecord(`*Paper_Space${count}`);
		const paper = this.addBlock(`*Paper_Space${count}`);
		paper.softPointer = paperBlock.handle;
		this._papersSpace.push(paper);
		return paper;
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		manager.sectionBegin('BLOCKS');
		manager.pushTags(
			this.blocks.reduce((tags: tag_t[], block) => {
				return [...tags, ...block.tags()];
			}, [])
		);
		manager.sectionEnd();
		return manager.tags;
	}

	public stringify(): string {
		const manager = new TagsManager();
		manager.pushTags(this.tags());
		return manager.stringify();
	}
}
