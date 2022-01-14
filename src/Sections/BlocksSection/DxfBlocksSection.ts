import DxfBlock from './DxfBlock';
import TagsManager, { tag_t } from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import DxfTablesSection from '../TablesSection/DxfTablesSection';

export default class DxfBlocksSection implements DxfInterface {
	private static _instance: DxfBlocksSection;
	private readonly _blocks: DxfBlock[] = [];
	private readonly _modelSpace: DxfBlock;
	private readonly _paperSpace: DxfBlock;

	public get modelSpace(): DxfBlock {
		return this._modelSpace;
	}

	public get paperSpace(): DxfBlock {
		return this._paperSpace;
	}

	public get blocks(): DxfBlock[] {
		return this._blocks;
	}

	private constructor() {
		this._modelSpace = this.addBlock('*Model_Space');
		this._paperSpace = this.addBlock('*Paper_Space');
		this.modelSpace.stringifyEntities = false;
	}

	public static getInstance(): DxfBlocksSection {
		if (!this._instance) this._instance = new DxfBlocksSection();
		return this._instance;
	}

	public addBlock(name: string): DxfBlock {
		const blockRecord = DxfTablesSection.getInstance().addBlockRecord(name);
		const block = new DxfBlock(name);
		block.softPointer = blockRecord.handle;
		this._blocks.push(block);
		return block;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionBegin('BLOCKS');
		manager.pushTags(
			this.blocks.reduce((tags: tag_t[], block) => {
				return [...tags, ...block.tags()];
			}, [])
		);
		manager.sectionEnd();
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
