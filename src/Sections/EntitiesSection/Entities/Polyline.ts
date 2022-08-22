import Entity, { CommonEntityOptions } from '../Entity';
import Vertex, { VertexFlags } from './Vertex';
import SeqEnd from './SeqEnd';
import BoundingBox, { boundingBox_t } from 'Internals/BoundingBox';
import { Dxifier } from 'Internals/Dxifier';
import { vec2_t, point3d, vec3_t } from 'Internals/Helpers';

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

export type polylineOptions_t = CommonEntityOptions & {
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
	vertices: vec3_t[];
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
		vertices: (vec3_t | vec2_t)[],
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

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.push(66, 1);
		dx.point3d(point3d(0, 0, this.elevation));
		dx.push(39, this.thickness);
		dx.push(70, this.flags);
		dx.push(40, this.defaultStartWidth);
		dx.push(41, this.defaultEndWidth);
		dx.push(71, this.polygonMeshM);
		dx.push(72, this.polygonMeshN);
		dx.push(73, this.smoothSurfaceM);
		dx.push(74, this.smoothSurfaceN);
		dx.push(75, this.surfaceType);
		this.vertexes.forEach((vertex) => {
			vertex.dxify(dx);
		});
		this.#seqEnd.dxify(dx);
	}
}
