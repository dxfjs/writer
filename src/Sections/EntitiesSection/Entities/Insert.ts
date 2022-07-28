import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier, point3d, point3d_t } from '../../../Internals/Dxifier';
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

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.name(this.blockName);
		mg.point3d(this.insertionPoint);
		mg.push(41, this.scaleFactor.x || 1);
		mg.push(42, this.scaleFactor.y || 1);
		mg.push(43, this.scaleFactor.z || 1);
		mg.push(50, this.rotationAngle);
		mg.push(70, this.columnCount);
		mg.push(71, this.rowCount);
		mg.push(44, this.columnSpacing);
		mg.push(45, this.rowSpacing);
	}
}
