import DxfBlock from './Sections/BlocksSection/DxfBlock';
import DxfBlocksSection from './Sections/BlocksSection/DxfBlocksSection';
import DxfTablesSection from './Sections/TablesSection/DxfTablesSection';

export function createBlock(name: string): DxfBlock {
	return DxfBlocksSection.getInstance().addBlock(name);
}

export function addAppId(name: string, flags: number = 0) {
	return DxfTablesSection.getInstance().addAppId(name, flags);
}

export function addBlockRecord(name: string) {
	return DxfTablesSection.getInstance().addBlockRecord(name);
}

export function addLineType(
	name: string,
	descriptive: string,
	elements: number[]
) {
	return DxfTablesSection.getInstance().addLineType(
		name,
		descriptive,
		elements
	);
}
