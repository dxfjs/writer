import TagsManager from '../../../../Internals/TagsManager';
import DxfRecord, { StyleFlags } from './DxfRecord';

export default class DxfStyle extends DxfRecord {
	readonly name: string;
	fixedTextHeight = 0;
	widthFactor = 1;
	obliqueAngle = 0;
	textGenerationFlag = 0;
	lastHeightUsed = 1;
	fontFileName = 'txt';
	bigFontFileName = '';
	flags: StyleFlags;

	constructor(name: string, flags?: StyleFlags) {
		super('STYLE');
		this.name = name;
		this.flags = flags ?? StyleFlags.None;
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.subclassMarker('AcDbTextStyleTableRecord');
		manager.name(this.name);
		manager.add(70, this.flags);
		manager.add(40, this.fixedTextHeight);
		manager.add(41, this.widthFactor);
		manager.add(50, this.obliqueAngle);
		manager.add(71, this.textGenerationFlag);
		manager.add(42, this.lastHeightUsed);
		manager.add(3, this.fontFileName);
		manager.add(4, this.bigFontFileName);
		return manager;
	}
}
