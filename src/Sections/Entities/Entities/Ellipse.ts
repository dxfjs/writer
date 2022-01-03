import Entity from '../Entity';
import TagsManager, { point3d_t, tag_t } from '../../../Internals/TagsManager';

export default class Ellipse extends Entity {
	private readonly _center: point3d_t;
	private readonly _xMajorAxis: number;
	private readonly _yMajorAxis: number;
	private readonly _ratioMinorAxis: number;
	private readonly _startParameter: number;
	private readonly _endParameter: number;

	public get endParameter(): number {
		return this._endParameter;
	}

	public get startParameter(): number {
		return this._startParameter;
	}

	public get ratioMinorAxis(): number {
		return this._ratioMinorAxis;
	}

	public get yMajorAxis(): number {
		return this._yMajorAxis;
	}

	public get xMajorAxis(): number {
		return this._xMajorAxis;
	}

	public get center(): point3d_t {
		return this._center;
	}

	public constructor(
		center: point3d_t,
		xMajorAxis: number,
		yMajorAxis: number,
		ratioMinorAxis: number,
		startParameter: number,
		endParameter: number
	) {
		super('ELLIPSE', 'AcDbEllipse');
		this._center = center;
		this._xMajorAxis = xMajorAxis;
		this._yMajorAxis = yMajorAxis;
		this._ratioMinorAxis = ratioMinorAxis;
		this._startParameter = startParameter;
		this._endParameter = endParameter;
	}

	public boundingBox() {
		// This is not the correct Bounding Box 😭
		const x = this.center.x;
		const y = this.center.y;
		const xMajor = this.xMajorAxis;
		const yMajor = this.yMajorAxis;

		const bigRadius = Math.sqrt(
			Math.pow(x - (x + xMajor), 2) + Math.pow(y - (y + yMajor), 2)
		);

		return [
			[this.center.x - bigRadius, this.center.y + bigRadius],
			[this.center.x + bigRadius, this.center.y - bigRadius],
		];
	}

	public tags(): tag_t[] {
		const [x, y, z] = [this.center.x, this.center.y, this.center.z];
		const manager = new TagsManager();
		manager.pushTags(super.tags());
		manager.point3d({ x, y, z });
		manager.point3d({ x: this.xMajorAxis, y: this.yMajorAxis, z: 0 }, 1);
		manager.addTag(40, this.ratioMinorAxis);
		manager.addTag(41, this.startParameter);
		manager.addTag(42, this.endParameter);
		return manager.tags;
	}
}
