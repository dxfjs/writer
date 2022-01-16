import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord from './DxfRecord';

export default class DxfStyle extends DxfRecord {
	readonly name: string;
	fixedTextHeight: number = 0;
	widthFactor: number = 1;
	obliqueAngle: number = 0;
	textGenerationFlag: number = 0;
	lastHeightUsed: number = 1;
	fontFileName: string = 'txt';
	bigFontFileName: string = '';
	flags: number;

	public constructor(name: string, flags?: number) {
		super('STYLE');
		this.name = name;
		this.flags = flags ?? 0;
	}

	public override get manager(): TagsManager {
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
