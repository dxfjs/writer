import GlobalState from './GlobalState';
import Handle from './Internals/Handle';
import DxfInterface from './Internals/Interfaces/DxfInterface';
import TagsManager, { point3d_t } from './Internals/TagsManager';
import DxfBlock from './Sections/BlocksSection/DxfBlock';
import DxfBlocksSection from './Sections/BlocksSection/DxfBlocksSection';
import DxfClassesSection from './Sections/ClassesSection/DxfClassesSection';
import DxfEntitiesSection from './Sections/EntitiesSection/DxfEntitiesSection';
import Image, {
	ImageOptions_t,
} from './Sections/EntitiesSection/Entities/Image';
import DxfHeaderSection from './Sections/HeaderSection/DxfHeaderSection';
import DxfObjects from './Sections/ObjectsSection/DxfObjectsSection';
import DxfImageDef from './Sections/ObjectsSection/Objects/DxfImageDef';
import DxfImageDefReactor from './Sections/ObjectsSection/Objects/DxfImageDefReactor';
import DxfTablesSection from './Sections/TablesSection/DxfTablesSection';
import DxfVPort from './Sections/TablesSection/Tables/Records/DxfVPort';

export default class DxfDocument implements DxfInterface {
	readonly header: DxfHeaderSection;
	readonly classes: DxfClassesSection;
	readonly tables: DxfTablesSection;
	readonly blocks: DxfBlocksSection;
	readonly entities: DxfEntitiesSection;
	readonly objects: DxfObjects;
	readonly activeVPort: DxfVPort;
	readonly modelSpace: DxfBlock;
	readonly paperSpace: DxfBlock;

	constructor() {
		this.header = new DxfHeaderSection();
		this.classes = new DxfClassesSection();
		this.tables = new DxfTablesSection();
		this.blocks = new DxfBlocksSection(this.tables);
		this.entities = new DxfEntitiesSection(this.blocks.modelSpace);
		this.objects = new DxfObjects();

		this.header.setVariable('$ACADVER', { 1: 'AC1021' });
		this.handseed();
		this.header.setVariable('$INSUNITS', { 70: GlobalState.units });

		this.tables.addLType('ByBlock', '', []);
		this.tables.addLType('ByLayer', '', []);
		this.tables.addLType('Continuous', 'Solid line', []);
		this.tables.addLayer('0', 7, 'Continuous', 0);
		this.tables.addStyle('Standard');
		this.tables.addAppId('ACAD', 0);
		this.tables.addDimStyle('Standard');
		this.activeVPort = this.tables.addVPort('*Active');

		this.modelSpace = this.blocks.modelSpace;
		this.paperSpace = this.blocks.paperSpace;
	}

	addBlock(name: string) {
		return this.blocks.addBlock(name);
	}

	setCurrentLayerName(name: string): void {
		const layerRecord = this.tables.layerTable.layerRecords.find(
			(layer) => layer.name === name
		);
		if (layerRecord) GlobalState.currentLayerName = name;
		else throw new Error(`The '${name} layer doesn't exist!'`);
	}

	private handseed() {
		this.header.setVariable('$HANDSEED', { 5: Handle.peek() });
	}

	setUnits(units: number) {
		GlobalState.units = units;
		this.header.setVariable('$INSUNITS', { 70: GlobalState.units });
	}

	setViewCenter(center: point3d_t) {
		this.header.setVariable('$VIEWCTR', {
			10: center.x,
			20: center.y,
		});
		this.activeVPort.viewCenter = [center.x, center.y];
	}

	addImage(
		imagePath: string,
		name: string,
		insertionPoint: point3d_t,
		width: number,
		height: number,
		scale: number,
		rotation: number,
		options?: ImageOptions_t
	): Image {
		// TODO make sure there is no IMAGEDEF for this image!
		const imageDef = new DxfImageDef(imagePath);
		imageDef.width = width;
		imageDef.height = height;
		const image = new Image(
			{
				height,
				width,
				scale,
				rotation,
				insertionPoint,
				imageDefHandle: imageDef.handle,
			},
			options
		);
		const imageDefReactor = new DxfImageDefReactor(image.handle);
		image.imageDefReactorHandle = imageDefReactor.handle;
		this.modelSpace.addEntity(image);
		this.objects.addObject(imageDef);
		this.objects.addObject(imageDefReactor);
		const dictionary = this.objects.addDictionary();

		dictionary.addEntryObject(name, imageDef.handle);
		imageDef.ownerObjecthandle = dictionary.handle;
		this.objects.root.addEntryObject('ACAD_IMAGE_DICT', dictionary.handle);
		imageDef.acadImageDictHandle = dictionary.handle;
		imageDef.addImageDefReactorHandle(imageDefReactor.handle);
		return image;
	}

	stringify(): string {
		this.handseed();
		this.setViewCenter(this.modelSpace.centerView()); // fit in
		this.activeVPort.viewHeight = this.modelSpace.viewHeight();
		return this.manager.stringify();
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.append(this.header);
		manager.append(this.classes);
		manager.append(this.tables);
		manager.append(this.blocks);
		manager.append(this.entities);
		manager.append(this.objects);
		return manager;
	}
}
