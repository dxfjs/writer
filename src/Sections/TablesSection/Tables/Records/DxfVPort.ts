import { Dxifier } from '../../../../Internals/Dxifier';
import DxfRecord from './DxfRecord';

export default class DxfVPort extends DxfRecord {
	readonly name: string;
	viewHeight: number;
	viewCenter: [number, number];

	constructor(name: string) {
		super('VPORT');
		this.name = name;
		this.viewHeight = 200;
		this.viewCenter = [0, 0];
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		const [x, y] = this.viewCenter;
		mg.subclassMarker('AcDbViewportTableRecord');
		mg.name(this.name);
		mg.push(70, 0);
		mg.point2d({ x: 0, y: 0 });
		mg.point2d({ x: 1, y: 1 }, 1);
		mg.point2d({ x: x, y: y }, 2);
		mg.point2d({ x: 0, y: 0 }, 3);
		mg.point2d({ x: 10, y: 10 }, 4);
		mg.point2d({ x: 10, y: 10 }, 5);
		mg.point3d({ x: 0, y: 0, z: 1 }, 6);
		mg.point3d({ x: 0, y: 0, z: 0 }, 7);
		mg.push(40, this.viewHeight);
		mg.push(41, 2); // TODO ?????????
		mg.push(42, 50);
		mg.push(43, 0);
		mg.push(44, 0);
		mg.push(50, 0);
		mg.push(51, 0);
		mg.push(71, 0);
		mg.push(72, 100);
		mg.push(73, 1);
		mg.push(74, 3);
		mg.push(75, 0);
		mg.push(76, 1);
		mg.push(77, 0);
		mg.push(78, 0);
		mg.push(281, 0);
		mg.push(65, 1);
		mg.push(110, 0);
		mg.push(120, 0);
		mg.push(130, 0);
		mg.push(111, 1);
		mg.push(121, 0);
		mg.push(131, 0);
		mg.push(112, 0);
		mg.push(122, 1);
		mg.push(132, 0);
		mg.push(79, 0);
		mg.push(146, 0);
		mg.push(348, 10020);
		mg.push(60, 7);
		mg.push(61, 5);
		mg.push(292, 1);
		mg.push(282, 1);
		mg.push(141, 0);
		mg.push(142, 0);
		mg.push(63, 250);
		mg.push(421, 3358443);
	}
}
