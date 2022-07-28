import DxfDefinedApplication from '../../../Internals/DefinedApplication';
import { Dxifier, point2d } from '../../../Internals/Dxifier';
import DxfObject from '../DxfObject';

export enum ImageDefResolutionUnits {
	NoUnits = 0,
	Centimeters = 2,
	Inch = 5,
}

export default class DxfImageDef extends DxfObject {
	readonly path: string;
	acadImageDictHandle: string;
	readonly imageReactorHandles: string[];
	width: number;
	height: number;
	widthPixelSize: number;
	heightPixelSize: number;
	loaded: boolean;
	resolutionUnits: ImageDefResolutionUnits;

	constructor(path: string) {
		super('IMAGEDEF');
		this.path = path;
		this.acadImageDictHandle = '';
		this.imageReactorHandles = [];
		this.width = 1;
		this.height = 1;
		this.widthPixelSize = 1;
		this.heightPixelSize = 1;
		this.loaded = true;
		this.resolutionUnits = ImageDefResolutionUnits.NoUnits;
	}

	addImageDefReactorHandle(id: string) {
		this.imageReactorHandles.push(id);
	}

	dxify(mg: Dxifier): void {
		super.dxify(mg);
		// TODO Need a dynamic way
		const da = new DxfDefinedApplication('ACAD_REACTORS');
		da.add(330, this.acadImageDictHandle);
		for (const handle of this.imageReactorHandles) {
			da.add(330, handle);
		}
		da.dxify(mg);
		mg.subclassMarker('AcDbRasterImageDef');
		mg.push(1, this.path);
		mg.point2d(point2d(this.width, this.height));
		mg.point2d(point2d(this.widthPixelSize, this.heightPixelSize), 1);
		mg.push(280, Number(this.loaded));
		mg.push(281, this.resolutionUnits);
	}
}
