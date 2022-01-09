import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Merge } from '../../../Internals/Utils';

export const vertexFlags = {
	extraVertex: 1,
	curveFit: 2,
	notUsed: 4,
	splineVertex: 8,
	splineFrame: 16,
	polyline3dVertex: 32,
	polygon3dMesh: 64,
	polyfaceMeshVertex: 128,
};

export type vertexOptions_t = Merge<
	options_t,
	{
		is3d: boolean;
		flags?: number;
		startingWidth?: number;
		endWidth?: number;
		bulge?: number;
	}
>;

export default class Vertex extends Entity {
	private readonly _vertex: point3d_t;
	private readonly _is3d: boolean;
	private readonly _flags: number;
	private readonly _startingWidth: number | undefined;
	private readonly _endWidth: number | undefined;
	private readonly _bulge: number | undefined;

	get vertex(): point3d_t {
		return this._vertex;
	}

	public get is3d(): boolean {
		return this._is3d;
	}

	public get flags(): number {
		return this._flags;
	}

	public get startingWidth(): number | undefined {
		return this._startingWidth;
	}

	public get endWidth(): number | undefined {
		return this._endWidth;
	}

	public get bulge(): number | undefined {
		return this._bulge;
	}

	public constructor(vertex: point3d_t, options: vertexOptions_t = {}) {
		super({ type: 'VERTEX', subclassMarker: 'AcDbVertex', options });
		this._vertex = vertex;
		this._is3d = options.is3d || true;
		this._flags = options.flags || 0;
		this._startingWidth = options.startingWidth;
		this._endWidth = options.endWidth;
		this._bulge = options.bulge;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(this.vertex);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker(
			this.is3d ? 'AcDb3dPolylineVertex' : 'AcDb2dVertex'
		);
		manager.point3d(this.vertex);
		manager.addTag(40, this.startingWidth);
		manager.addTag(41, this.endWidth);
		manager.addTag(42, this.bulge);
		manager.addTag(70, this.flags);
		return manager;
	}
}
