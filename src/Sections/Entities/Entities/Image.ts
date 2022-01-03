import TagsManager, { point3d_t, tag_t } from '../../../Internals/TagsManager';
import ImageDef from '../../Objects/Objects/DxfImageDef';
import Entity from '../Entity';

export type ImageOptions = {
	fileName: string;
	width: number;
	height: number;
	scale: number;
	insertionPoint: point3d_t;
};

export default class Image extends Entity {
	private _fileName: string;
	private _width: number;
	private _height: number;
	private _scale: number;
	private _insertionPoint: point3d_t;
	private _imageDef: ImageDef;

	public get imageDef(): ImageDef {
		return this._imageDef;
	}

	public constructor(options: ImageOptions) {
		super('IMAGE', 'AcDbRasterImage');
		this._fileName = options.fileName;
		this._width = options.width;
		this._height = options.height;
		this._scale = options.scale;
		this._insertionPoint = options.insertionPoint;
		this._imageDef = new ImageDef(this._fileName);
	}

	public boundingBox(): number[][] {
		return [
			[0, 0],
			[1000, 1000],
		];
	}

	public tags(): tag_t[] {
		const ratio = this._scale / this._width;
		const manager = new TagsManager();
		manager.pushTags(super.tags());
		manager.addTag(90, 0);
		manager.point3d(this._insertionPoint);
		manager.point3d({ x: ratio, y: 0, z: 0 }, 1);
		manager.point3d({ x: 0, y: ratio, z: 0 }, 1);
		manager.addTag(13, this._width);
		manager.addTag(23, this._height);
		manager.addTag(340, this._imageDef.handle);
		manager.addTag(70, 1);

		return manager.tags;
	}
}
