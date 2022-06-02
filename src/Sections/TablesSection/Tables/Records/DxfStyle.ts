import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfStyle extends DxfRecord {
	readonly name: string;
	fixedTextHeight = 0;
	widthFactor = 1;
	obliqueAngle = 0;
	textGenerationFlag = 0;
	lastHeightUsed = 1;
	fontFileName = 'txt';
	bigFontFileName = '';
	flags: number;

	constructor(name: string, flags?: number) {
		super('STYLE');
		this.name = name;
		this.flags = flags ?? 0;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.pushTags(super.manager.tags);
		manager.subclassMarker('AcDbTextStyleTableRecord');
		manager.name(this.name);
		manager.addTag(70, this.flags);
		manager.addTag(40, this.fixedTextHeight);
		manager.addTag(41, this.widthFactor);
		manager.addTag(50, this.obliqueAngle);
		manager.addTag(71, this.textGenerationFlag);
		manager.addTag(42, this.lastHeightUsed);
		manager.addTag(3, this.fontFileName);
		manager.addTag(4, this.bigFontFileName);
		return manager;
	}
}
