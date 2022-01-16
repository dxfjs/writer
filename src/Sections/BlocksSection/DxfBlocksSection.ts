import DxfBlock from './DxfBlock';
import TagsManager, { tag_t } from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import DxfTablesSection from '../TablesSection/DxfTablesSection';

export default class DxfBlocksSection implements DxfInterface {
	static #instance: DxfBlocksSection;
	readonly blocks: DxfBlock[] = [];
	readonly modelSpace: DxfBlock;
	readonly paperSpace: DxfBlock;

	private constructor() {
		this.modelSpace = this.addBlock('*Model_Space');
		this.paperSpace = this.addBlock('*Paper_Space');
		this.modelSpace.stringifyEntities = false;
	}

	public static getInstance(): DxfBlocksSection {
		if (!this.#instance) this.#instance = new DxfBlocksSection();
		return this.#instance;
	}

	public addBlock(name: string): DxfBlock {
		const blockRecord = DxfTablesSection.getInstance().addBlockRecord(name);
		const block = new DxfBlock(name);
		block.softPointer = blockRecord.handle;
		this.blocks.push(block);
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
