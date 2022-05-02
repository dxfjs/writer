import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import TagsManager, {
	point2d,
	point3d,
	point2d_t,
	point3d_t,
} from '../../../Internals/TagsManager';
import Entity, { options_t } from '../Entity';

export enum ImageDisplayFlags {
	ShowImage = 1,
	ShowImageWhenNotAlignedWithScreen = 2,
	UseClippingBoundary = 4,
	TransparencyIsOn = 8,
}

export enum ImageClippingStateFlags {
	Off = 0,
	On = 1,
}

export enum ImageClipModeFlags {
	Outside = 0,
	Inside = 1,
}

export type ImageArgs_t = {
	width: number;
	height: number;
	scale: number;
	rotation: number;
	insertionPoint: point3d_t;
	imageDefId: string;
};

export type ImageOptions_t = options_t & {
	imageDisplayFlags: ImageDisplayFlags;
	brightness: number;
	contrast: number;
	fade: number;
};

export default class Image extends Entity {
	width: number;
	height: number;
	scale: number;
	rotation: number;
	insertionPoint: point3d_t;
	imageDefId: string;
	imageDefReactorId?: string;

	ratio: number;

	public constructor(imageArgs: ImageArgs_t, options?: ImageOptions_t) {
		super('IMAGE', 'AcDbRasterImage', options);
		this.width = imageArgs.width;
		this.height = imageArgs.height;
		this.scale = imageArgs.scale;
		this.rotation = imageArgs.rotation;
		this.insertionPoint = imageArgs.insertionPoint;
		this.ratio = this.scale / this.width;
		this.imageDefId = imageArgs.imageDefId;
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

	public override get manager(): TagsManager {
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
