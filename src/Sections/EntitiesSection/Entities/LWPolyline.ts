import Entity, { options_t } from '../Entity';
import TagsManager, {
	point2d_t,
	point3d,
} from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

/**
 * @public
 */
export enum LWPolylineFlags {
	None = 0,
	Closed = 1,
	Plinegen = 128,
}

/**
 * @public
 */
export type lwPolylineOptions_t = options_t & {
	flags?: LWPolylineFlags;
	constantWidth?: number;
	elevation?: number;
	thickness?: number;
};

/**
 * @public
 */
export type lwPolylineVertex_t = {
	point: point2d_t;
	startingWidth?: number;
	endWidth?: number;
	bulge?: number;
};

/**
 * @public
 */
export default class LWPolyline extends Entity {
	vertices: lwPolylineVertex_t[];
	flags: LWPolylineFlags;
	constantWidth: number;
	elevation: number;
	thickness: number;

	constructor(
		vertices: lwPolylineVertex_t[],
		options?: lwPolylineOptions_t
	) {
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

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.addTag(90, this.vertices.length);
		manager.addTag(70, this.flags || 0);

		if (
			!this.vertices.find((vertex) => {
				return (
					vertex.startingWidth &&
					vertex.startingWidth > 0 &&
					vertex.endWidth &&
					vertex.endWidth > 0
				);
			})
		) {
			manager.addTag(43, this.constantWidth);
		}
		manager.elevation(this.elevation);
		manager.thickness(this.thickness);
		this.vertices.forEach((vertex) => {
			manager.point2d(vertex.point);
			manager.addTag(40, vertex.startingWidth);
			manager.addTag(41, vertex.endWidth);
			manager.addTag(42, vertex.bulge);
		});
		return manager;
	}
}
