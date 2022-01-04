import Handle from './Internals/Handle';
import DxfInterface from './Internals/Interfaces/DXFInterface';
import TagsManager from './Internals/TagsManager';
import DxfBlocks from './Sections/Blocks/DxfBlocks';
import DxfClasses from './Sections/Classes/DxfClasses';
import Entities from './Sections/Entities/Entities';
import DxfHeader from './Sections/Header/DxfHeader';
import DxfObjects from './Sections/Objects/DxfObjects';
import DxfTables from './Sections/Tables/DxfTables';

export default class DxfManager implements DxfInterface {
	private readonly _header: DxfHeader;
	private readonly _classes: DxfClasses;
	private readonly _tables: DxfTables;
	private readonly _blocks: DxfBlocks;
	private readonly _entities: Entities;
	private readonly _objects: DxfObjects;

	static currentLayerName = '0';
	static currentUnits = 0;

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
		this.header.setVariable('$INSUNITS', { 70: DxfManager.currentUnits });
		this.setViewCenter(0, 0);

		this.tables.addLineType('BYBLOCK', '', []);
		this.tables.addLineType('BYLAYER', '', []);
		this.tables.addLineType('CONTINUOUS', 'Solid line', []);
		this.tables.addLayer('0', 7, 'CONTINUOUS');
		this.tables.addStyle('STANDARD');
		this.tables.addAppId('ACAD');
		this.tables.addDimStyle('STANDARD');
		this.tables.addViewPort('*ACTIVE');
		this.tables.addBlockRecord('*MODEL_SPACE');
		this.tables.addBlockRecord('*PAPER_SPACE');

		this.blocks.addBlock('*MODEL_SPACE');
		this.blocks.addBlock('*PAPER_SPACE');
	}

	private updateHandleSeed() {
		this.header.setVariable('$HANDSEED', { 5: Handle.nextHandle() });
	}

	public setUnits(units: number) {
		DxfManager.currentUnits = units;
		this.header.setVariable('$INSUNITS', { 70: DxfManager.currentUnits });
	}

	public setViewCenter(x: number, y: number) {
		this.header.setVariable('$VIEWCTR', { 10: x, 20: y });
	}

	stringify(): string {
		this.updateHandleSeed();
		return this.manager.stringify();
	}

	get manager(): TagsManager {
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
