import DxfBlock from './DxfBlock';
import DxfInterface from 'Internals/Interfaces/DxfInterface';
import DxfTablesSection from 'TablesSection/DxfTablesSection';
import DxfObjectsSection from 'ObjectsSection/DxfObjectsSection';
import { Dxifier } from 'Internals/Dxifier';

export default class DxfBlocksSection implements DxfInterface {
	readonly blocks: DxfBlock[] = [];
	readonly modelSpace: DxfBlock;
	readonly paperSpace: DxfBlock;
	readonly tables: DxfTablesSection;

	constructor(tables: DxfTablesSection, objects: DxfObjectsSection) {
		this.tables = tables;
		this.modelSpace = this.addBlock('*Model_Space', objects);
		this.paperSpace = this.addBlock('*Paper_Space', objects);
		this.modelSpace.stringifyEntities = false;
	}

	addBlock(name: string, objects: DxfObjectsSection): DxfBlock {
		const blockRecord = this.tables.addBlockRecord(name);
		const block = new DxfBlock(name, objects);
		block.ownerObjectHandle = blockRecord.handle;
		this.blocks.push(block);
		return block;
	}

	dxify(dx: Dxifier) {
		dx.start('BLOCKS');
		for (const b of this.blocks) b.dxify(dx);
		dx.end();
	}
}
