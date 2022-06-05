import DxfDefinedApplication from '../../../Internals/DefinedApplication';
import TagsManager, { point2d } from '../../../Internals/TagsManager';
import DxfObject from '../DxfObject';

export enum ImageDefResolutionUnits {
	NoUnits = 0,
	Centimeters = 2,
	Inch = 5,
}

export default class DxfImageDef extends DxfObject {
	readonly path: string;
	acadImageDicId: string;
	readonly imageReactorIds: string[];
	width: number;
	height: number;
	widthPixelSize: number;
	heightPixelSize: number;
	loaded: boolean;
	resolutionUnits: ImageDefResolutionUnits;

	constructor(path: string) {
		super('IMAGEDEF');
		this.path = path;
		this.acadImageDicId = '';
		this.imageReactorIds = [];
		this.width = 1;
		this.height = 1;
		this.widthPixelSize = 1;
		this.heightPixelSize = 1;
		this.loaded = true;
		this.resolutionUnits = ImageDefResolutionUnits.NoUnits;
	}

	addImageDefReactorId(id: string) {
		this.imageReactorIds.push(id);
	}

	override get manager(): TagsManager {
		// TODO Need a dynamic way
		const definedApp = new DxfDefinedApplication('ACAD_REACTORS');
		definedApp.addTag(330, this.acadImageDicId);
		this.imageReactorIds.forEach((id) => {
			definedApp.addTag(330, id);
		});

		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.appendTags(definedApp);
		manager.subclassMarker('AcDbRasterImageDef');
		manager.addTag(1, this.path);
		manager.point2d(point2d(this.width, this.height));
		manager.point2d(point2d(this.widthPixelSize, this.heightPixelSize), 1);
		manager.addTag(280, Number(this.loaded));
		manager.addTag(281, this.resolutionUnits);
		return manager;
	}
}
