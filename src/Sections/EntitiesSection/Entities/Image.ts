import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier } from '../../../Internals/Dxifier';
import {
	point2d,
	point2d_t,
	point3d,
	point3d_t,
} from '../../../Internals/Utils';
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

	constructor(imageArgs: ImageArgs_t, options?: ImageOptions_t) {
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

	override boundingBox(): boundingBox_t {
		const width = this.scale;
		const height = (this.width / this.height) * this.scale;
		const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
		return BoundingBox.centerRadiusBBox(this.insertionPoint, diagonal);
	}

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.push(90, this.classVersion);
		dx.point3d(this.insertionPoint);
		dx.point3d(this._uVector(), 1);
		dx.point3d(this._vVector(), 2);
		dx.push(13, this.width);
		dx.push(23, this.height);
		dx.push(340, this.imageDefHandle);
		dx.push(70, this.imageDisplayFlags);
		dx.push(280, this.clippingStateFlag);
		dx.push(281, this.brightness);
		dx.push(282, this.contrast);
		dx.push(283, this.fade);
		dx.push(360, this.imageDefReactorHandle);
		dx.push(71, this.clippingType);
		dx.push(91, this.#clipBoundaryVertices.length);
		for (const vertex of this.#clipBoundaryVertices) {
			dx.push(14, vertex.x);
			dx.push(24, vertex.y);
		}
		dx.push(290, this.clipModeFlag);
	}
}
