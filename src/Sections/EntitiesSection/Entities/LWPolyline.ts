import Entity, { options_t } from '../Entity';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier, point2d_t, point3d } from '../../../Internals/Dxifier';

export enum LWPolylineFlags {
	None = 0,
	Closed = 1,
	Plinegen = 128,
}

export type lwPolylineOptions_t = options_t & {
	flags?: LWPolylineFlags;
	constantWidth?: number;
	elevation?: number;
	thickness?: number;
};

export type lwPolylineVertex_t = {
	point: point2d_t;
	startingWidth?: number;
	endWidth?: number;
	bulge?: number;
};

export default class LWPolyline extends Entity {
	vertices: lwPolylineVertex_t[];
	flags: LWPolylineFlags;
	constantWidth: number;
	elevation: number;
	thickness: number;

	constructor(vertices: lwPolylineVertex_t[], options?: lwPolylineOptions_t) {
		super('LWPOLYLINE', 'AcDbPolyline', options);
		this.vertices = vertices;
		this.flags = options?.flags || LWPolylineFlags.None;
		this.constantWidth = options?.constantWidth || 0;
		this.elevation = options?.elevation || 0;
		this.thickness = options?.thickness || 0;
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.verticesBBox(
			this.vertices.map((vertex) =>
				point3d(vertex.point.x, vertex.point.y, 0)
			)
		);
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		mg.push(90, this.vertices.length);
		mg.push(70, this.flags || 0);

		if (
			!this.vertices.find((v) => {
				return (
					v.startingWidth &&
					v.startingWidth > 0 &&
					v.endWidth &&
					v.endWidth > 0
				);
			})
		) {
			mg.push(43, this.constantWidth);
		}
		mg.elevation(this.elevation);
		mg.thickness(this.thickness);
		for (const v of this.vertices) {
			mg.point2d(v.point);
			mg.push(40, v.startingWidth);
			mg.push(41, v.endWidth);
			mg.push(42, v.bulge);
		}
	}
}
