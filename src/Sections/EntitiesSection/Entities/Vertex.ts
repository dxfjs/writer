import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

export enum vertexFlags {
	ExtraVertex = 1,
	CurveFit = 2,
	NotUsed = 4,
	SplineVertex = 8,
	SplineFrame = 16,
	Polyline3dVertex = 32,
	Polygon3dMesh = 64,
	PolyfaceMeshVertex = 128,
}

export type vertexOptions_t = options_t & {
	is3d: boolean;
	flags?: number;
	startingWidth?: number;
	endWidth?: number;
	bulge?: number;
};

export default class Vertex extends Entity {
	readonly vertex: point3d_t;
	readonly is3d: boolean;
	readonly flags: number;
	readonly startingWidth?: number;
	readonly endWidth?: number;
	readonly bulge?: number;

	public constructor(vertex: point3d_t, options: vertexOptions_t) {
		super({ type: 'VERTEX', subclassMarker: 'AcDbVertex', options });
		this.vertex = vertex;
		this.is3d = options.is3d;
		this.flags = options.flags ?? 0;
		if ('startingWidth' in options)
			this.startingWidth = options.startingWidth;
		if ('endWidth' in options) this.endWidth = options.endWidth;
		if ('bulge' in options) this.bulge = options.bulge;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(this.vertex);
	}

	public override get manager(): TagsManager {
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
