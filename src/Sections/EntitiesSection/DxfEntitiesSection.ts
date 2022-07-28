import { Dxifier } from '../../Internals/Dxifier';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import DxfBlock from '../BlocksSection/DxfBlock';

export default class DxfEntitiesSection implements DxfInterface {
	readonly modelSpace: DxfBlock;

	constructor(modelSpace: DxfBlock) {
		this.modelSpace = modelSpace;
	}

	setLayerName(layerName: string) {
		this.modelSpace.setlayerName(layerName);
	}

	dxify(mg: Dxifier) {
		mg.start('ENTITIES');
		mg.end();
	}
}
