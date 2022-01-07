import DxfBlock from './DxfBlock';
import TagsManager, { tag_t } from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';

export default class DxfBlocks implements DxfInterface {
	private readonly _blocks: DxfBlock[] = [];

	get blocks(): DxfBlock[] {
		return this._blocks;
	}

	public constructor() {}

	public addBlock(name: string) {
		const block = new DxfBlock(name);
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
