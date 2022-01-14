import { boundingBox_t } from '../../../Internals/BoundingBox';
import Entity from '../Entity';

export default class Insert extends Entity {
	private readonly _blockName: string;

	public get blockName(): string {
		return this._blockName;
	}

	public constructor(blockName: string) {
		super({ type: 'INSERT', subclassMarker: 'AcDbBlockReference' });
		this._blockName = blockName;
	}

	public boundingBox(): boundingBox_t {
		throw new Error('Method not implemented.');
	}
}
