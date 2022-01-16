import GlobalState from './GlobalState';
import Handle from './Internals/Handle';
import DxfInterface from './Internals/Interfaces/DxfInterface';
import TagsManager, { point3d_t } from './Internals/TagsManager';
import DxfBlock from './Sections/BlocksSection/DxfBlock';
import DxfBlocksSection from './Sections/BlocksSection/DxfBlocksSection';
import DxfClassesSection from './Sections/ClassesSection/DxfClassesSection';
import DxfEntitiesSection from './Sections/EntitiesSection/DxfEntitiesSection';
import Image from './Sections/EntitiesSection/Entities/Image';
import { options_t } from './Sections/EntitiesSection/Entity';
import DxfHeaderSection from './Sections/HeaderSection/DxfHeaderSection';
import DxfObjects from './Sections/ObjectsSection/DxfObjectsSection';
import DxfImageDef from './Sections/ObjectsSection/Objects/DxfImageDef';
import DxfImageDefReactor from './Sections/ObjectsSection/Objects/DxfImageDefReactor';
import DxfTablesSection from './Sections/TablesSection/DxfTablesSection';
import DxfViewPort from './Sections/TablesSection/Tables/Records/DxfViewPort';

export default class DxfManager implements DxfInterface {
	static #instance: DxfManager;
	readonly headerSection: DxfHeaderSection;
	readonly classesSection: DxfClassesSection;
	readonly tablesSection: DxfTablesSection;
	readonly blocksSection: DxfBlocksSection;
	readonly entitiesSection: DxfEntitiesSection;
	readonly objectsSection: DxfObjects;
	readonly activeViewPort: DxfViewPort;
	readonly modelSpace: DxfBlock;
	readonly paperSpace: DxfBlock;

	private constructor() {
		this.headerSection = DxfHeaderSection.getInstance();
		this.classesSection = DxfClassesSection.getInstance();
		this.tablesSection = DxfTablesSection.getInstance();
		this.blocksSection = DxfBlocksSection.getInstance();
		this.entitiesSection = DxfEntitiesSection.getInstance();
		this.objectsSection = DxfObjects.getInstance();

		this.headerSection.setVariable('$ACADVER', { 1: 'AC1021' });
		this.updateHandleSeed();
		this.headerSection.setVariable('$INSUNITS', { 70: GlobalState.units });

		this.tablesSection.addLineType('ByBlock', '', []);
		this.tablesSection.addLineType('ByLayer', '', []);
		this.tablesSection.addLineType('Continuous', 'Solid line', []);
		this.tablesSection.addLayer('0', 7, 'Continuous', 0);
		this.tablesSection.addStyle('Standard');
		this.tablesSection.addAppId('ACAD', 0);
		this.tablesSection.addDimStyle('Standard');
		this.activeViewPort = this.tablesSection.addViewPort('*Active');

		this.modelSpace = this.blocksSection.modelSpace;
		this.paperSpace = this.blocksSection.paperSpace;
	}

	public static getInstance(): DxfManager {
		if (!this.#instance) this.#instance = new DxfManager();
		return this.#instance;
	}

	public addBlock(name: string) {
		return this.blocksSection.addBlock(name);
	}

	public setCurrentLayerName(name: string): void {
		const layerRecord = this.tablesSection.layerTable.layerRecords.find(
			(layer) => layer.name === name
		);
		if (layerRecord) GlobalState.currentLayerName = name;
		else throw new Error(`The '${name} layer doesn't exist!'`);
	}

	private updateHandleSeed() {
		this.headerSection.setVariable('$HANDSEED', { 5: Handle.nextHandle() });
	}

	public setUnits(units: number) {
		GlobalState.units = units;
		this.headerSection.setVariable('$INSUNITS', { 70: GlobalState.units });
	}

	public setViewCenter(center: point3d_t) {
		this.headerSection.setVariable('$VIEWCTR', {
			10: center.x,
			20: center.y,
		});
		this.activeViewPort.viewCenter = [center.x, center.y];
	}

	public addImage(
		absolutePath: string,
		name: string,
		insertionPoint: point3d_t,
		width: number,
		height: number,
		scale: number,
		rotation: number,
		options: options_t
	) {
		const imageDef = new DxfImageDef(absolutePath);
		const image = new Image(
			{
				height,
				width,
				scale,
				rotation,
				insertionPoint,
				imageDefId: imageDef.handle,
			},
			options
		);
		const imageDefReactor = new DxfImageDefReactor(image.handle);
		image.imageDefReactorId = imageDefReactor.handle;
		this.modelSpace.addEntity(image);
		this.objectsSection.addObject(imageDef);
		this.objectsSection.addObject(imageDefReactor);
		const dictionary = this.objectsSection.createDictionary();

		dictionary.addEntryObject(name, imageDef.handle);
		imageDef.softPointer = dictionary.handle;
		this.objectsSection.rootDictionary.addEntryObject(
			'ACAD_IMAGE_DICT',
			dictionary.handle
		);
		imageDef.acadImageDicId = dictionary.handle;
		imageDef.imageReactorId = imageDefReactor.handle;
	}

	public stringify(): string {
		this.updateHandleSeed();
		this.setViewCenter(this.modelSpace.centerView()); // fit in
		this.activeViewPort.viewHeight = this.modelSpace.viewHeight();
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.appendTags(this.headerSection);
		manager.appendTags(this.classesSection);
		manager.appendTags(this.tablesSection);
		manager.appendTags(this.blocksSection);
		manager.appendTags(this.entitiesSection);
		manager.appendTags(this.objectsSection);
		return manager;
	}
}
