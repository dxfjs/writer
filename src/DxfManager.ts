import GlobalState from './GlobalState';
import Handle from './Internals/Handle';
import DxfInterface from './Internals/Interfaces/DxfInterface';
import TagsManager, { point3d_t } from './Internals/TagsManager';
import DxfBlock from './Sections/BlocksSection/DxfBlock';
import DxfBlocks from './Sections/BlocksSection/DxfBlocks';
import DxfClasses from './Sections/Classes/DxfClasses';
import Entities from './Sections/Entities/Entities';
import Image from './Sections/Entities/Entities/Image';
import { options_t } from './Sections/Entities/Entity';
import DxfHeader from './Sections/Header/DxfHeader';
import DxfObjects from './Sections/Objects/DxfObjects';
import DxfImageDef from './Sections/Objects/Objects/DxfImageDef';
import DxfImageDefReactor from './Sections/Objects/Objects/DxfImageDefReactor';
import DxfTables from './Sections/Tables/DxfTables';
import DxfViewPort from './Sections/Tables/Tables/Records/DxfViewPort';

export default class DxfManager implements DxfInterface {
	private readonly _headerSection: DxfHeader;
	private readonly _classesSection: DxfClasses;
	private readonly _tablesSection: DxfTables;
	private readonly _blocksSection: DxfBlocks;
	private readonly _entitiesSection: Entities;
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

	public get headerSection(): DxfHeader {
		return this._headerSection;
	}

	public get classesSection(): DxfClasses {
		return this._classesSection;
	}

	public get tablesSection(): DxfTables {
		return this._tablesSection;
	}

	public get blocksSection(): DxfBlocks {
		return this._blocksSection;
	}

	public get entitiesSection(): Entities {
		return this._entitiesSection;
	}

	public get objectsSection(): DxfObjects {
		return this._objectsSection;
	}

	public constructor() {
		this._headerSection = new DxfHeader();
		this._classesSection = new DxfClasses();
		this._tablesSection = new DxfTables();
		this._blocksSection = new DxfBlocks();
		this._objectsSection = new DxfObjects();

		this.headerSection.setVariable('$ACADVER', { 1: 'AC1021' });
		this.updateHandleSeed();
		this.headerSection.setVariable('$INSUNITS', { 70: GlobalState.units });

		this.tablesSection.addLineType('ByBlock', '', []);
		this.tablesSection.addLineType('ByLayer', '', []);
		this.tablesSection.addLineType('Continuous', 'Solid line', []);
		this.tablesSection.addLayer('0', 7, 'Continuous');
		this.tablesSection.addStyle('Standard');
		this.tablesSection.addAppId('ACAD');
		this.tablesSection.addDimStyle('Standard');
		this._activeViewPort = this.tablesSection.addViewPort('*Active');

		this._modelSpace = this.addBlock('*Model_Space');
		this._paperSpace = this.addBlock('*Paper_Space');

		// After model sapce creation
		this._entitiesSection = new Entities(this.modelSpace.softPointer);
	}

	public addBlock(name: string) {
		const blockRecord = this.tablesSection.addBlockRecord(name);
		const block = this.blocksSection.addBlock(name);
		block.softPointer = blockRecord.handle;
		block.endBlk.softPointer = blockRecord.handle;
		return block;
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
		this.entitiesSection.addEntity(image);
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
		this.setViewCenter(this.entitiesSection.centerView()); // fit in
		this._activeViewPort.viewHeight = this.entitiesSection.viewHeight();
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
