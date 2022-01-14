import DxfBlock from './Sections/BlocksSection/DxfBlock';
import DxfBlocksSection from './Sections/BlocksSection/DxfBlocksSection';

export function createBlock(name: string): DxfBlock {
	return DxfBlocksSection.getInstance().addBlock(name);
}
