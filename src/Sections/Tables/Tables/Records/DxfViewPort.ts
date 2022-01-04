import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfViewPort extends DxfRecord {
	private readonly _name: string;
	private _viewHeight: number;
	private _viewCenter: [number, number];

	public get name(): string {
		return this._name;
	}

	public get viewHeight(): number {
		return this._viewHeight;
	}

	public set viewHeight(value: number) {
		this._viewHeight = value;
	}

	public get viewCenter(): [number, number] {
		return this._viewCenter;
	}

	public set viewCenter(value: [number, number]) {
		this._viewCenter = value;
	}

	public constructor(name: string) {
		super('VPORT');
		this._name = name;
		this._viewHeight = 200;
		this._viewCenter = [0, 0];
	}

	public get manager(): TagsManager {
		const [x, y] = this.viewCenter;
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbViewportTableRecord');
		manager.name(this.name);
		manager.addTag(70, 0);
		manager.point2d({ x: 0, y: 0 });
		manager.point2d({ x: 1, y: 1 }, 1);
		manager.point2d({ x: x || 0, y: y || 0 }, 2);
		manager.point2d({ x: 0, y: 0 }, 3);
		manager.point2d({ x: 10, y: 10 }, 4);
		manager.point2d({ x: 10, y: 10 }, 5);
		manager.point3d({ x: 0, y: 0, z: 1 }, 6);
		manager.point3d({ x: 0, y: 0, z: 0 }, 7);
		manager.addTag(40, this.viewHeight);
		manager.addTag(41, 2); // TODO ?????????
		manager.addTag(42, 50);
		manager.addTag(43, 0);
		manager.addTag(44, 0);
		manager.addTag(50, 0);
		manager.addTag(51, 0);
		manager.addTag(71, 0);
		manager.addTag(72, 100);
		manager.addTag(73, 1);
		manager.addTag(74, 3);
		manager.addTag(75, 0);
		manager.addTag(76, 1);
		manager.addTag(77, 0);
		manager.addTag(78, 0);
		manager.addTag(281, 0);
		manager.addTag(65, 1);
		manager.addTag(110, 0);
		manager.addTag(120, 0);
		manager.addTag(130, 0);
		manager.addTag(111, 1);
		manager.addTag(121, 0);
		manager.addTag(131, 0);
		manager.addTag(112, 0);
		manager.addTag(122, 1);
		manager.addTag(132, 0);
		manager.addTag(79, 0);
		manager.addTag(146, 0);
		manager.addTag(60, 7);
		manager.addTag(61, 5);
		manager.addTag(292, 1);
		manager.addTag(282, 1);
		manager.addTag(141, 0);
		manager.addTag(142, 0);
		manager.addTag(63, 250);
		manager.addTag(421, 3358443);

		return manager;
	}
}
