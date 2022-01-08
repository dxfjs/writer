import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import TagsManager, {
	point2d,
	point3d,
	point2d_t,
	point3d_t,
} from '../../../Internals/TagsManager';
import Entity, { options_t } from '../Entity';

export type ImageOptions = {
	width: number;
	height: number;
	scale: number;
	rotation: number;
	insertionPoint: point3d_t;
	imageDefId: string;
};

export default class Image extends Entity {
	private readonly _width: number;
	private readonly _height: number;
	private readonly _scale: number;
	private readonly _rotation: number;
	private readonly _insertionPoint: point3d_t;
	private readonly _imageDefId: string;
	private _imageDefReactorId: string;

	private readonly _ratio: number;

	public get width(): number {
		return this._width;
	}

	public get height(): number {
		return this._height;
	}

	public get scale(): number {
		return this._scale;
	}

	public get rotation(): number {
		return this._rotation;
	}

	public get insertionPoint(): point3d_t {
		return this._insertionPoint;
	}

	public get imageDefId(): string {
		return this._imageDefId;
	}

	public get imageDefReactorId(): string {
		return this._imageDefReactorId;
	}

	public set imageDefReactorId(value: string) {
		this._imageDefReactorId = value;
	}

	public get ratio(): number {
		return this._ratio;
	}

	public constructor(imageOptions: ImageOptions, options: options_t) {
		super('IMAGE', 'AcDbRasterImage', options);
		this._width = imageOptions.width;
		this._height = imageOptions.height;
		this._scale = imageOptions.scale;
		this._rotation = imageOptions.rotation;
		this._insertionPoint = imageOptions.insertionPoint;
		this._ratio = this.scale / this.width;
		this._imageDefId = imageOptions.imageDefId;
		this._imageDefReactorId = '0';
	}

	private _vector(): point2d_t {
		const x = this.ratio * Math.cos((this.rotation * Math.PI) / 180);
		const y = this.ratio * Math.sin((this.rotation * Math.PI) / 180);
		return point2d(x, y);
	}

	private _uVector(): point3d_t {
		const v = this._vector();
		return point3d(v.x, -v.y, 0);
	}

	private _vVector(): point3d_t {
		const v = this._vector();
		return point3d(v.y, v.x, 0);
	}

	public boundingBox(): boundingBox_t {
		const width = this.scale;
		const height = (this.width / this.height) * this.scale;
		const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
		return BoundingBox.centerRadiusBBox(this.insertionPoint, diagonal);
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.addTag(90, 0);
		manager.point3d(this.insertionPoint);
		manager.point3d(this._uVector(), 1);
		manager.point3d(this._vVector(), 2);
		manager.addTag(13, this.width);
		manager.addTag(23, this.height);
		manager.addTag(340, this.imageDefId);
		manager.addTag(70, 3);
		manager.addTag(360, this.imageDefReactorId);
		return manager;
	}
}
