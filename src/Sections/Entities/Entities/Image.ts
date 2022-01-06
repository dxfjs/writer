import TagsManager, {
	createPoint3d,
	point3d_t,
} from '../../../Internals/TagsManager';
import Entity from '../Entity';

export type ImageOptions = {
	width: number;
	height: number;
	scale: number;
	insertionPoint: point3d_t;
	imageDefId: string;
};

export default class Image extends Entity {
	private readonly _width: number;
	private readonly _height: number;
	private readonly _scale: number;
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

	public constructor(options: ImageOptions) {
		super('IMAGE', 'AcDbRasterImage');
		this._width = options.width;
		this._height = options.height;
		this._scale = options.scale;
		this._insertionPoint = options.insertionPoint;
		this._ratio = this.scale / this.width;
		this._imageDefId = options.imageDefId;
		this._imageDefReactorId = '0';
	}

	public boundingBox(): number[][] {
		return [
			[0, 0],
			[1000, 1000],
		];
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.addTag(90, 0);
		manager.point3d(this.insertionPoint);
		manager.point3d(createPoint3d(this.ratio, 0, 0), 1);
		manager.point3d(createPoint3d(0, this.ratio, 0), 2);
		manager.addTag(13, this.width);
		manager.addTag(23, this.height);
		manager.addTag(340, this.imageDefId);
		manager.addTag(70, 1);
		manager.addTag(360, this.imageDefReactorId);
		return manager;
	}
}
