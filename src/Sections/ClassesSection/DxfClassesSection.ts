import { Dxifier } from 'Internals/Dxifier';
import DxfInterface from 'Internals/Interfaces/DxfInterface';

export default class DxfClassesSection implements DxfInterface {
	dxify(dx: Dxifier) {
		dx.start('CLASSES');
		dx.end();
	}
}
