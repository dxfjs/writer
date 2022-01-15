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
	private static _instance: DxfManager;
	private readonly _headerSection: DxfHeaderSection;
	private readonly _classesSection: DxfClassesSection;
	private readonly _tablesSection: DxfTablesSection;
	private readonly _blocksSection: DxfBlocksSection;
	private readonly _entitiesSection: DxfEntitiesSection;
	private readonly _objectsSection: DxfObjects;

	private readonly _activeViewPort: DxfViewPort;

	private readonly _modelSpace: DxfBlock;
	private readonly _paperSpace: DxfBlock;

	public get modelSpace(): DxfBlock {
		return this._modelSpace;
	}

	public get paperSpace(): DxfBlock {
		return this._paperSpace;
	}

	public get headerSection(): DxfHeaderSection {
		return this._headerSection;
	}

	public get classesSection(): DxfClassesSection {
		return this._classesSection;
	}

	public get tablesSection(): DxfTablesSection {
		return this._tablesSection;
	}

	public get blocksSection(): DxfBlocksSection {
		return this._blocksSection;
	}

	public get entitiesSection(): DxfEntitiesSection {
		return this._entitiesSection;
	}

	public get objectsSection(): DxfObjects {
		return this._objectsSection;
	}

	private constructor() {
		this._headerSection = DxfHeaderSection.getInstance();
		this._classesSection = DxfClassesSection.getInstance();
		this._tablesSection = DxfTablesSection.getInstance();
		this._blocksSection = DxfBlocksSection.getInstance();
		this._entitiesSection = DxfEntitiesSection.getInstance();
		this._objectsSection = DxfObjects.getInstance();

		this.headerSection.setVariable('$ACADVER', { 1: 'AC1021' });
		this.updateHandleSeed();
		this.headerSection.setVariable('$INSUNITS', { 70: GlobalState.units });

		this.tablesSection.addLineType('ByBlock', '', []);
		this.tablesSection.addLineType('ByLayer', '', []);
		this.tablesSection.addLineType('Continuous', 'Solid line', []);
		this.tablesSection.addLayer('0', 7, 'Continuous');
		this.tablesSection.addStyle('Standard');
		this.tablesSection.addAppId('ACAD', 0);
		this.tablesSection.addDimStyle('Standard');
		this._activeViewPort = this.tablesSection.addViewPort('*Active');

		this._modelSpace = this.blocksSection.modelSpace;
		this._paperSpace = this.blocksSection.paperSpace;
	}

	public static getInstance(): DxfManager {
		if (!this._instance) this._instance = new DxfManager();
		return this._instance;
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
		this._activeViewPort.viewCenter = [center.x, center.y];
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
		this._activeViewPort.viewHeight = this.modelSpace.viewHeight();
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
