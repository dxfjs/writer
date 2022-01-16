import { point3d_t } from '../../../index';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import TagsManager from '../../../Internals/TagsManager';
import Entity, { options_t } from '../Entity';

export type insertScaleFactor_t = {
	x?: number;
	y?: number;
	z?: number;
};

export type insertOptions_t = options_t & {
	scaleFactor?: insertScaleFactor_t;
	rotationAngle?: number;
	columnCount?: number;
	rowCount?: number;
	columnSpacing?: number;
	rowSpacing?: number;
};

export default class Insert extends Entity {
	private readonly _blockName: string;
	private readonly _insertionPoint: point3d_t;
	private readonly _scaleFactor: insertScaleFactor_t | undefined;
	private readonly _rotationAngle: number | undefined;
	private readonly _columnCount: number | undefined;
	private readonly _rowCount: number | undefined;
	private readonly _columnSpacing: number | undefined;
	private readonly _rowSpacing: number | undefined;

	public get scaleFactor(): insertScaleFactor_t | undefined {
		return this._scaleFactor;
	}

	public get rotationAngle(): number | undefined {
		return this._rotationAngle;
	}

	public get columnCount(): number | undefined {
		return this._columnCount;
	}

	public get rowCount(): number | undefined {
		return this._rowCount;
	}

	public get columnSpacing(): number | undefined {
		return this._columnSpacing;
	}

	public get rowSpacing(): number | undefined {
		return this._rowSpacing;
	}

	public get blockName(): string {
		return this._blockName;
	}

	public get insertionPoint(): point3d_t {
		return this._insertionPoint;
	}

	public constructor(
		blockName: string,
		insertionPoint: point3d_t,
		options: insertOptions_t
	) {
		super({
			type: 'INSERT',
			subclassMarker: 'AcDbBlockReference',
			options,
		});
		this._blockName = blockName;
		this._insertionPoint = insertionPoint;
		this._scaleFactor = options?.scaleFactor;
		this._rotationAngle = options?.rotationAngle;
		this._columnCount = options?.columnCount;
		this._rowCount = options?.rowCount;
		this._columnSpacing = options?.columnSpacing;
		this._rowSpacing = options?.rowSpacing;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(this.insertionPoint);
	}

	public override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.name(this.blockName);
		manager.point3d(this.insertionPoint);
		if (this.scaleFactor) {
			manager.addTag(41, this.scaleFactor.x);
			manager.addTag(42, this.scaleFactor.y);
			manager.addTag(43, this.scaleFactor.z);
		}
		manager.addTag(50, this.rotationAngle);
		manager.addTag(70, this.columnCount);
		manager.addTag(71, this.rowCount);
		manager.addTag(44, this.columnSpacing);
		manager.addTag(45, this.rowSpacing);
		return manager;
	}
}
