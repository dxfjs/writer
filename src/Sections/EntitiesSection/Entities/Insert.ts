import { point3d_t } from '../../../index';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import TagsManager from '../../../Internals/TagsManager';
import Entity from '../Entity';

export default class Insert extends Entity {
	private readonly _blockName: string;
	private readonly _insertionPoint: point3d_t;

	public get blockName(): string {
		return this._blockName;
	}

	public get insertionPoint(): point3d_t {
		return this._insertionPoint;
	}

	public constructor(blockName: string, insertionPoint: point3d_t) {
		super({ type: 'INSERT', subclassMarker: 'AcDbBlockReference' });
		this._blockName = blockName;
		this._insertionPoint = insertionPoint;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(this.insertionPoint);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.name(this.blockName);
		manager.point3d(this.insertionPoint);
		return manager;
	}
}
