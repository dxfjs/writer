import { point3d_t } from '../../../index';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import TagsManager, { point3d } from '../../../Internals/TagsManager';
import Entity, { options_t } from '../Entity';

export type insertOptions_t = options_t & {
	scaleFactor?: Partial<point3d_t>;
	rotationAngle?: number;
	columnCount?: number;
	rowCount?: number;
	columnSpacing?: number;
	rowSpacing?: number;
};

export default class Insert extends Entity {
	blockName: string;
	insertionPoint: point3d_t;
	scaleFactor: Partial<point3d_t>;
	rotationAngle: number;
	columnCount: number;
	rowCount: number;
	columnSpacing: number;
	rowSpacing: number;

	constructor(
		blockName: string,
		insertionPoint: point3d_t,
		options?: insertOptions_t
	) {
		super('INSERT', 'AcDbBlockReference', options);
		this.blockName = blockName;
		this.insertionPoint = insertionPoint;
		this.scaleFactor = options?.scaleFactor || point3d(1, 1, 1);
		this.rotationAngle = options?.rotationAngle || 0;
		this.columnCount = options?.columnCount || 1;
		this.rowCount = options?.rowCount || 1;
		this.columnSpacing = options?.columnSpacing || 0;
		this.rowSpacing = options?.rowSpacing || 0;
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(this.insertionPoint);
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.name(this.blockName);
		manager.point3d(this.insertionPoint);
		manager.add(41, this.scaleFactor.x || 1);
		manager.add(42, this.scaleFactor.y || 1);
		manager.add(43, this.scaleFactor.z || 1);
		manager.add(50, this.rotationAngle);
		manager.add(70, this.columnCount);
		manager.add(71, this.rowCount);
		manager.add(44, this.columnSpacing);
		manager.add(45, this.rowSpacing);
		return manager;
	}
}
