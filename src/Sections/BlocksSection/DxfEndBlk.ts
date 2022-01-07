import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../Internals/TagsManager';

export default class DxfEndBlk extends Handle implements DxfInterface {
	stringify(): string {
		return this.manager.stringify();
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType('ENDBLK');
		manager.handle(this.handle);
		manager.pushTag(this.softPointerTag());
		manager.subclassMarker('AcDbEntity');
		manager.layerName('0'); // TODO make this dynamic
		manager.subclassMarker('AcDbBlockEnd');
		return manager;
	}
}
