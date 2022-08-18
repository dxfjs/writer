import Entity, { options_t } from '../Entity';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier } from '../../../Internals/Dxifier';
import { vec3_t } from '../../../Internals/Helpers';

export enum VertexFlags {
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
	is3d?: boolean;
	flags?: number;
	startingWidth?: number;
	endWidth?: number;
	bulge?: number;
};

export default class Vertex extends Entity {
	vertex: vec3_t;
	is3d: boolean;
	flags: number;
	startingWidth?: number;
	endWidth?: number;
	bulge?: number;

	constructor(vertex: vec3_t, options?: vertexOptions_t) {
		super('VERTEX', 'AcDbVertex', options);
		this.vertex = vertex;
		this.is3d = options?.is3d || true;
		this.flags = options?.flags ?? VertexFlags.NotUsed;
		if (options) {
			if ('startingWidth' in options)
				this.startingWidth = options.startingWidth;
			if ('endWidth' in options) this.endWidth = options.endWidth;
			if ('bulge' in options) this.bulge = options.bulge;
		}
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(this.vertex);
	}

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.subclassMarker(this.is3d ? 'AcDb3dPolylineVertex' : 'AcDb2dVertex');
		dx.point3d(this.vertex);
		dx.push(40, this.startingWidth);
		dx.push(41, this.endWidth);
		dx.push(42, this.bulge);
		dx.push(70, this.flags);
	}
}
