import DxfDefinedApplication from '../../../Internals/DefinedApplication';
import TagsManager, { point2d } from '../../../Internals/TagsManager';
import DxfObject from '../DxfObject';

export default class DxfImageDef extends DxfObject {
	readonly fileName: string;
	acadImageDicId: string;
	imageReactorId: string;

	public constructor(fileName: string) {
		super('IMAGEDEF');
		this.fileName = fileName;
		this.acadImageDicId = '';
		this.imageReactorId = '';
	}

	public override get manager(): TagsManager {
		const definedApp = new DxfDefinedApplication('ACAD_REACTORS');
		definedApp.addTag(330, this.acadImageDicId);
		definedApp.addTag(330, this.imageReactorId);

		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.appendTags(definedApp);
		manager.subclassMarker('AcDbRasterImageDef');
		manager.addTag(1, this.fileName);
		manager.point2d(point2d(1, 1));
		manager.point2d(point2d(1, 1), 1);
		manager.addTag(280, 1);
		manager.addTag(281, 0);
		return manager;
	}
}
