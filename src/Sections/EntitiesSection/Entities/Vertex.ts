import Entity, { options_t } from '../Entity';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier, point3d_t } from '../../../Internals/Dxifier';

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
	vertex: point3d_t;
	is3d: boolean;
	flags: number;
	startingWidth?: number;
	endWidth?: number;
	bulge?: number;

	constructor(vertex: point3d_t, options?: vertexOptions_t) {
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

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.subclassMarker(this.is3d ? 'AcDb3dPolylineVertex' : 'AcDb2dVertex');
		mg.point3d(this.vertex);
		mg.push(40, this.startingWidth);
		mg.push(41, this.endWidth);
		mg.push(42, this.bulge);
		mg.push(70, this.flags);
	}
}
