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

export enum ImageClippingType {
	Rectangular = 1,
	Polygonal = 2,
}

export enum ImageClippingStateFlag {
	Off = 0,
	On = 1,
}

export enum ImageClipModeFlag {
	Outside = 0,
	Inside = 1,
}

export type ImageArgs_t = {
	width: number;
	height: number;
	scale: number;
	rotation: number;
	insertionPoint: point3d_t;
	imageDefHandle: string;
};

export type ImageOptions_t = options_t & {
	imageDisplayFlags?: ImageDisplayFlags;
	clippingStateFlag?: ImageClippingStateFlag;
	clipModeFlag?: ImageClipModeFlag;
	clippingType?: ImageClippingType;
	brightness?: number;
	contrast?: number;
	fade?: number;
	classVersion?: number;
};

export default class Image extends Entity {
	width: number;
	height: number;
	scale: number;
	rotation: number;
	insertionPoint: point3d_t;
	imageDefHandle: string;
	imageDefReactorHandle?: string;
	imageDisplayFlags: ImageDisplayFlags;
	clippingStateFlag: ImageClippingStateFlag;
	clipModeFlag: ImageClipModeFlag;
	clippingType: ImageClippingType;
	#clipBoundaryVertices: point2d_t[];
	brightness: number;
	contrast: number;
	fade: number;
	ratio: number;
	classVersion: number;

	public constructor(imageArgs: ImageArgs_t, options?: ImageOptions_t) {
		super('IMAGE', 'AcDbRasterImage', options);
		this.width = imageArgs.width;
		this.height = imageArgs.height;
		this.scale = imageArgs.scale;
		this.rotation = imageArgs.rotation;
		this.insertionPoint = imageArgs.insertionPoint;
		this.ratio = this.scale / this.width;
		this.imageDefHandle = imageArgs.imageDefHandle;
		this.imageDisplayFlags =
			options?.imageDisplayFlags ||
			ImageDisplayFlags.ShowImage |
				ImageDisplayFlags.ShowImageWhenNotAlignedWithScreen;
		this.clippingStateFlag =
			options?.clippingStateFlag || ImageClippingStateFlag.On;
		this.clipModeFlag = options?.clipModeFlag || ImageClipModeFlag.Inside;
		this.clippingType =
			options?.clippingType || ImageClippingType.Rectangular;
		this.brightness = options?.brightness || 50;
		this.contrast = options?.brightness || 50;
		this.fade = options?.fade || 0;
		this.#clipBoundaryVertices = [];
		this.classVersion = options?.classVersion || 0;
		this.resetClipping();
	}

	/**
	 *
	 * @param verticies - The clip boundary verticies.
	 * @param clippingType - The clipping boundary type.
	 */
	setClipBoundaryVerticies(
		verticies: point2d_t[],
		clippingType: ImageClippingType
	) {
		if (clippingType === ImageClippingType.Rectangular) {
			if (verticies.length == 2) {
				this.#clipBoundaryVertices = verticies;
			} else {
				throw new Error(
					'The number of vertices should be 2 in rectangular clipping !'
				);
			}
		} else {
			if (verticies.length >= 3) {
				this.#clipBoundaryVertices = verticies;
			} else {
				throw new Error(
					'The number of vertices should be >= 3 in polygonal clipping !'
				);
			}
		}
		this.#clipBoundaryVertices = [];
		this.#clipBoundaryVertices.push(...verticies);
	}

	resetClipping() {
		const verticies = [
			point2d(-0.5, -0.5),
			point2d(this.width - 0.5, this.height - 0.5),
		];
		this.setClipBoundaryVerticies(verticies, ImageClippingType.Rectangular);
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
		manager.addTag(90, this.classVersion);
		manager.point3d(this.insertionPoint);
		manager.point3d(this._uVector(), 1);
		manager.point3d(this._vVector(), 2);
		manager.addTag(13, this.width);
		manager.addTag(23, this.height);
		manager.addTag(340, this.imageDefHandle);
		manager.addTag(70, this.imageDisplayFlags);
		manager.addTag(280, this.clippingStateFlag);
		manager.addTag(281, this.brightness);
		manager.addTag(282, this.contrast);
		manager.addTag(283, this.fade);
		manager.addTag(360, this.imageDefReactorHandle);
		manager.addTag(71, this.clippingType);
		manager.addTag(91, this.#clipBoundaryVertices.length);
		this.#clipBoundaryVertices.forEach((vertex) => {
			manager.addTag(14, vertex.x);
			manager.addTag(24, vertex.y);
		});
		manager.addTag(290, this.clipModeFlag);
		return manager;
	}
}
