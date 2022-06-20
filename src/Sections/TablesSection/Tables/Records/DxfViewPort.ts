import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfViewPort extends DxfRecord {
	readonly name: string;
	viewHeight: number;
	viewCenter: [number, number];

	constructor(name: string) {
		super('VPORT');
		this.name = name;
		this.viewHeight = 200;
		this.viewCenter = [0, 0];
	}

	override get manager(): TagsManager {
		const [x, y] = this.viewCenter;
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.subclassMarker('AcDbViewportTableRecord');
		manager.name(this.name);
		manager.add(70, 0);
		manager.point2d({ x: 0, y: 0 });
		manager.point2d({ x: 1, y: 1 }, 1);
		manager.point2d({ x: x, y: y }, 2);
		manager.point2d({ x: 0, y: 0 }, 3);
		manager.point2d({ x: 10, y: 10 }, 4);
		manager.point2d({ x: 10, y: 10 }, 5);
		manager.point3d({ x: 0, y: 0, z: 1 }, 6);
		manager.point3d({ x: 0, y: 0, z: 0 }, 7);
		manager.add(40, this.viewHeight);
		manager.add(41, 2); // TODO ?????????
		manager.add(42, 50);
		manager.add(43, 0);
		manager.add(44, 0);
		manager.add(50, 0);
		manager.add(51, 0);
		manager.add(71, 0);
		manager.add(72, 100);
		manager.add(73, 1);
		manager.add(74, 3);
		manager.add(75, 0);
		manager.add(76, 1);
		manager.add(77, 0);
		manager.add(78, 0);
		manager.add(281, 0);
		manager.add(65, 1);
		manager.add(110, 0);
		manager.add(120, 0);
		manager.add(130, 0);
		manager.add(111, 1);
		manager.add(121, 0);
		manager.add(131, 0);
		manager.add(112, 0);
		manager.add(122, 1);
		manager.add(132, 0);
		manager.add(79, 0);
		manager.add(146, 0);
		manager.add(348, 10020);
		manager.add(60, 7);
		manager.add(61, 5);
		manager.add(292, 1);
		manager.add(282, 1);
		manager.add(141, 0);
		manager.add(142, 0);
		manager.add(63, 250);
		manager.add(421, 3358443);

		return manager;
	}
}
