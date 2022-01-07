import GlobalState from './GlobalState';
import Handle from './Internals/Handle';
import DxfInterface from './Internals/Interfaces/DxfInterface';
import TagsManager, { point3d_t } from './Internals/TagsManager';
import DxfBlocks from './Sections/BlocksSection/DxfBlocks';
import DxfClasses from './Sections/Classes/DxfClasses';
import Entities from './Sections/Entities/Entities';
import Image from './Sections/Entities/Entities/Image';
import DxfHeader from './Sections/Header/DxfHeader';
import DxfObjects from './Sections/Objects/DxfObjects';
import DxfImageDef from './Sections/Objects/Objects/DxfImageDef';
import DxfImageDefReactor from './Sections/Objects/Objects/DxfImageDefReactor';
import DxfTables from './Sections/Tables/DxfTables';
import DxfViewPort from './Sections/Tables/Tables/Records/DxfViewPort';

export default class DxfManager implements DxfInterface {
	private readonly _header: DxfHeader;
	private readonly _classes: DxfClasses;
	private readonly _tables: DxfTables;
	private readonly _blocks: DxfBlocks;
	private readonly _entities: Entities;
	private readonly _objects: DxfObjects;

	private readonly _activeViewPort: DxfViewPort;

	public get header(): DxfHeader {
		return this._header;
	}

	public get classes(): DxfClasses {
		return this._classes;
	}

	public get tables(): DxfTables {
		return this._tables;
	}

	public get blocks(): DxfBlocks {
		return this._blocks;
	}

	public get entities(): Entities {
		return this._entities;
	}

	public get objects(): DxfObjects {
		return this._objects;
	}

	public constructor() {
		this._header = new DxfHeader();
		this._classes = new DxfClasses();
		this._tables = new DxfTables();
		this._blocks = new DxfBlocks();
		this._entities = new Entities();
		this._objects = new DxfObjects();

		this.header.setVariable('$ACADVER', { 1: 'AC1021' });
		this.updateHandleSeed();
		this.header.setVariable('$INSUNITS', { 70: GlobalState.units });

		this.tables.addLineType('ByBlock', '', []);
		this.tables.addLineType('ByLayer', '', []);
		this.tables.addLineType('Continuous', 'Solid line', []);
		this.tables.addLayer('0', 7, 'Continuous');
		this.tables.addStyle('Standard');
		this.tables.addAppId('ACAD');
		this.tables.addDimStyle('Standard');
		this._activeViewPort = this.tables.addViewPort('*Active');

		const modelRecord = this.tables.addBlockRecord('*Model_Space');
		const paperRecord = this.tables.addBlockRecord('*Paper_Space');

		const modelBlock = this.blocks.addBlock('*Model_Space');
		const paperBlock = this.blocks.addBlock('*Paper_Space');
		modelBlock.softPointer = modelRecord.handle;
		modelBlock.endBlk.softPointer = modelRecord.handle;
		paperBlock.softPointer = paperRecord.handle;
		paperBlock.endBlk.softPointer = paperRecord.handle;
	}

	private updateHandleSeed() {
		this.header.setVariable('$HANDSEED', { 5: Handle.nextHandle() });
	}

	public setUnits(units: number) {
		GlobalState.units = units;
		this.header.setVariable('$INSUNITS', { 70: GlobalState.units });
	}

	public setViewCenter(center: point3d_t) {
		this.header.setVariable('$VIEWCTR', { 10: center.x, 20: center.y });
		this._activeViewPort.viewCenter = [center.x, center.y];
	}

	public addImage(
		absolutePath: string,
		name: string,
		insertionPoint: point3d_t,
		width: number,
		height: number,
		scale: number,
		rotation: number
	) {
		const imageDef = new DxfImageDef(absolutePath);
		const image = new Image({
			height,
			width,
			scale,
			rotation,
			insertionPoint,
			imageDefId: imageDef.handle,
		});
		const imageDefReactor = new DxfImageDefReactor(image.handle);
		image.imageDefReactorId = imageDefReactor.handle;
		this.entities.addEntity(image);
		this.objects.addObject(imageDef);
		this.objects.addObject(imageDefReactor);
		const dictionary = this.objects.createDictionary();

		dictionary.addEntryObject(name, imageDef.handle);
		imageDef.softPointer = dictionary.handle;
		this.objects.rootDictionary.addEntryObject(
			'ACAD_IMAGE_DICT',
			dictionary.handle
		);
		imageDef.acadImageDicId = dictionary.handle;
		imageDef.imageReactorId = imageDefReactor.handle;
	}

	public stringify(): string {
		this.updateHandleSeed();
		this.setViewCenter(this.entities.centerView());
		this._activeViewPort.viewHeight = this.entities.viewHeight();
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.appendTags(this.header);
		manager.appendTags(this.classes);
		manager.appendTags(this.tables);
		manager.appendTags(this.blocks);
		manager.appendTags(this.entities);
		manager.appendTags(this.objects);
		return manager;
	}
}
