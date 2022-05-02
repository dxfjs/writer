import Entity, { options_t } from '../Entity';
import TagsManager, { point3d } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

/**
 * @public
 */
export enum LWPolylineFlags {
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
	x: number;
	y: number;
	startingWidth?: number;
	endWidth?: number;
	bulge?: number;
};

/**
 * @public
 */
export default class LWPolyline extends Entity {
	private readonly _vertices: lwPolylineVertex_t[];
	private readonly _flags: LWPolylineFlags | undefined;
	private readonly _constantWidth: number | undefined;
	private readonly _elevation: number | undefined;
	private readonly _thickness: number | undefined;

	public get vertices(): lwPolylineVertex_t[] {
		return this._vertices;
	}

	public get flags(): number | undefined {
		return this._flags;
	}

	public get constantWidth(): number | undefined {
		return this._constantWidth;
	}

	public get elevation(): number | undefined {
		return this._elevation;
	}

	public get thickness(): number | undefined {
		return this._thickness;
	}

	public constructor(
		vertices: lwPolylineVertex_t[],
		options: lwPolylineOptions_t
	) {
		super('LWPOLYLINE', 'AcDbPolyline', options);
		this._vertices = vertices;
		this._flags = options.flags;
		this._constantWidth = options.constantWidth;
		this._elevation = options.elevation;
		this._thickness = options.thickness;
	}

	public boundingBox(): boundingBox_t {
		return BoundingBox.verticesBBox(
			this.vertices.map((p) => point3d(p.x, p.y, 0))
		);
	}

	public override get manager(): TagsManager {
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
			manager.point2d(vertex);
			manager.addTag(40, vertex.startingWidth);
			manager.addTag(41, vertex.endWidth);
			manager.addTag(42, vertex.bulge);
		});
		return manager;
	}
}
