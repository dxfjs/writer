import { Dxifier } from '../../Internals/Dxifier';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';

export default class DxfClassesSection implements DxfInterface {
	dxify(mg: Dxifier) {
		mg.start('CLASSES');
		mg.end();
	}
}
