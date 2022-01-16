import DxfBlock from './Sections/BlocksSection/DxfBlock';
import DxfBlocksSection from './Sections/BlocksSection/DxfBlocksSection';
import DxfTablesSection from './Sections/TablesSection/DxfTablesSection';

export function addBlock(name: string): DxfBlock {
	return DxfBlocksSection.getInstance().addBlock(name);
}

export function addAppId(name: string, flags?: number) {
	return DxfTablesSection.getInstance().addAppId(name, flags);
}

export function addBlockRecord(name: string) {
	return DxfTablesSection.getInstance().addBlockRecord(name);
}

export function addDimStyle(name: string, flags?: number) {
	return DxfTablesSection.getInstance().addDimStyle(name, flags);
}

export function addLineType(
	name: string,
	descriptive: string,
	elements: number[],
	flags?: number
) {
	return DxfTablesSection.getInstance().addLineType(
		name,
		descriptive,
		elements,
		flags
	);
}

export function addLayer(
	name: string,
	color: number,
	lineType: string,
	flags?: number
) {
	return DxfTablesSection.getInstance().addLayer(
		name,
		color,
		lineType,
		flags
	);
}

export function addStyle(name: string) {
	return DxfTablesSection.getInstance().addStyle(name);
}