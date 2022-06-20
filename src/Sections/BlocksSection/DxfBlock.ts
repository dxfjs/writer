import TagsManager, { point3d_t, tag_t } from '../../Internals/TagsManager';
import EntitiesManager from '../EntitiesSection/EntitiesManager';
import EndBlk from './DxfEndBlk';

/**
 * @public
 */
export default class DxfBlock extends EntitiesManager {
	readonly name: string;
	readonly endBlk: EndBlk;
	stringifyEntities = true;
	ownerObject?: string;

	blockTypeFlags = 0;
	basePoint: point3d_t = {
		x: 0,
		y: 0,
		z: 0,
	};
	xrefPathName = '';

	public constructor(name: string) {
		super();
		this.name = name;
		this.endBlk = new EndBlk();
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		manager.entityType('BLOCK');
		manager.handle(this.handle);
		manager.add(330, this.ownerObject);
		manager.subclassMarker('AcDbEntity');
		manager.layerName('0'); // TODO make this dynamic
		manager.subclassMarker('AcDbBlockBegin');
		manager.name(this.name);
		manager.add(70, this.blockTypeFlags);
		manager.point3d(this.basePoint);
		manager.name(this.name, 3);
		manager.add(1, this.xrefPathName);
		if (this.stringifyEntities) {
			this.entities.forEach((entity) => {
				manager.append(entity);
			});
		}
		manager.append(this.endBlk);
		return manager.tags;
	}
}
