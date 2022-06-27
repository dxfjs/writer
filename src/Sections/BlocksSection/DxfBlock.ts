import TagsManager, {
	point3d,
	point3d_t,
	tag_t,
} from '../../Internals/TagsManager';
import EntitiesManager from '../EntitiesSection/EntitiesManager';
import DxfObjectsSection from '../ObjectsSection/DxfObjectsSection';
import EndBlk from './DxfEndBlk';

export enum BlockFlags {
	None = 0,
	AnonymousBlock = 1,
	HasNonConstantAttribute = 2,
	XRef = 4,
	XRefOverlay = 8,
	ExternallyDependent = 16,
	ResolvedXRef = 32,
	ReferencedXRef = 64,
}

export default class DxfBlock extends EntitiesManager {
	readonly name: string;
	readonly endBlk: EndBlk;
	stringifyEntities = true;
	ownerObjectHandle?: string;
	flags: BlockFlags;
	basePoint: point3d_t;
	xrefPathName: string;

	constructor(name: string, objects: DxfObjectsSection) {
		super(objects, '0');
		this.name = name;
		this.flags = BlockFlags.None;
		this.endBlk = new EndBlk();
		this.basePoint = point3d(0, 0, 0);
		this.xrefPathName = '';
	}

	setlayerName(layerName: string) {
		this.layerName = layerName;
	}

	tags(): tag_t[] {
		const manager = new TagsManager();
		manager.entityType('BLOCK');
		manager.handle(this.handle);
		manager.add(330, this.ownerObjectHandle);
		manager.subclassMarker('AcDbEntity');
		manager.layerName(this.layerName);
		manager.subclassMarker('AcDbBlockBegin');
		manager.name(this.name);
		manager.add(70, this.flags);
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
