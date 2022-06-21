import DxfBlock from './DxfBlock';
import TagsManager, { tag_t } from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import DxfTablesSection from '../TablesSection/DxfTablesSection';

export default class DxfBlocksSection implements DxfInterface {
	readonly blocks: DxfBlock[] = [];
	readonly modelSpace: DxfBlock;
	readonly paperSpace: DxfBlock;
	readonly tables: DxfTablesSection;

	constructor(tableSection: DxfTablesSection) {
		this.tables = tableSection;
		this.modelSpace = this.addBlock('*Model_Space');
		this.paperSpace = this.addBlock('*Paper_Space');
		this.modelSpace.stringifyEntities = false;
	}

	addBlock(name: string): DxfBlock {
		const blockRecord = this.tables.addBlockRecord(name);
		const block = new DxfBlock(name);
		block.ownerObjectHandle = blockRecord.handle;
		this.blocks.push(block);
		return block;
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionStart('BLOCKS');
		manager.push(
			this.blocks.reduce((tags: tag_t[], block) => {
				return [...tags, ...block.tags()];
			}, [])
		);
		manager.sectionEnd();
		return manager;
	}

	stringify(): string {
		return this.manager.stringify();
	}
}
