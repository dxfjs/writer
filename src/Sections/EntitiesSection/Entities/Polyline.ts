import Entity, { options_t } from '../Entity';
import Vertex, { VertexFlags } from './Vertex';
import SeqEnd from './SeqEnd';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import {
	Dxifier,
	point2d_t,
	point3d,
	point3d_t,
} from '../../../Internals/Dxifier';

export enum PolylineFlags {
	None = 0,
	Closed = 1,
	CurveFit = 2,
	SplineFit = 4,
	Polyline3D = 8,
	PolygonMesh3D = 16,
	PolygonMeshClosed = 32,
	PolyfaceMesh = 64,
	LinetypeGenerated = 128,
}

export enum SurfaceType {
	NoSmooth = 0,
	QuadraticBSpline = 5,
	CubicBSpline = 6,
	Bezier = 8,
}

export type polylineOptions_t = options_t & {
	flags?: PolylineFlags;
	elevation?: number;
	thickness?: number;
	defaultStartWidth?: number;
	defaultEndWidth?: number;
	polygonMeshM?: number;
	polygonMeshN?: number;
	smoothSurfaceM?: number;
	smoothSurfaceN?: number;
	surfaceType?: SurfaceType;
};

export default class Polyline extends Entity {
	vertices: point3d_t[];
	elevation: number;
	thickness: number;
	flags: PolylineFlags;
	vertexes: Vertex[] = [];
	#seqEnd = new SeqEnd();
	defaultStartWidth: number;
	defaultEndWidth: number;
	polygonMeshM: number;
	polygonMeshN: number;
	smoothSurfaceM: number;
	smoothSurfaceN: number;
	surfaceType: SurfaceType;
	is3D: boolean;

	public constructor(
		vertices: (point3d_t | point2d_t)[],
		options?: polylineOptions_t
	) {
		super('POLYLINE', 'AcDb3dPolyline', options);
		this.vertices = [];
		this.is3D = false;
		vertices.forEach((vertex) => {
			if ('z' in vertex) {
				this.is3D = true;
				this.vertices.push(vertex);
			} else
				this.vertices.push({
					...vertex,
					z: 0,
				});
		});
		this.subclassMarker = this.is3D ? 'AcDb3dPolyline' : 'AcDb2dPolyline';
		this.thickness = options?.thickness || 0;
		this.elevation = options?.elevation || 0;
		this.flags = options?.flags || PolylineFlags.None;

		this.defaultStartWidth = options?.defaultStartWidth || 0;
		this.defaultEndWidth = options?.defaultEndWidth || 0;
		this.polygonMeshM = options?.polygonMeshM || 0;
		this.polygonMeshN = options?.polygonMeshN || 0;
		this.smoothSurfaceM = options?.smoothSurfaceM || 0;
		this.smoothSurfaceN = options?.smoothSurfaceN || 0;
		this.surfaceType = options?.surfaceType || SurfaceType.NoSmooth;

		this.vertices.forEach((point) => {
			this.vertexes.push(
				new Vertex(point, {
					flags: VertexFlags.Polyline3dVertex,
				})
			);
		});
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.verticesBBox(this.vertices);
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.push(66, 1);
		mg.point3d(point3d(0, 0, this.elevation));
		mg.push(39, this.thickness);
		mg.push(70, this.flags);
		mg.push(40, this.defaultStartWidth);
		mg.push(41, this.defaultEndWidth);
		mg.push(71, this.polygonMeshM);
		mg.push(72, this.polygonMeshN);
		mg.push(73, this.smoothSurfaceM);
		mg.push(74, this.smoothSurfaceN);
		mg.push(75, this.surfaceType);
		this.vertexes.forEach((vertex) => {
			vertex.dxify(mg);
		});
		this.#seqEnd.dxify(mg);
	}
}
