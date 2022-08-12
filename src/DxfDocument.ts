import { Dxifier } from './Internals/Dxifier';
import { Colors, Units } from './Internals/Enums';
import Handle from './Internals/Handle';
import DxfInterface from './Internals/Interfaces/DxfInterface';
import { point3d_t } from './Internals/Utils';
import DxfBlock from './Sections/BlocksSection/DxfBlock';
import DxfBlocksSection from './Sections/BlocksSection/DxfBlocksSection';
import DxfClassesSection from './Sections/ClassesSection/DxfClassesSection';
import DxfEntitiesSection from './Sections/EntitiesSection/DxfEntitiesSection';
import DxfHeaderSection from './Sections/HeaderSection/DxfHeaderSection';
import DxfObjectsSection from './Sections/ObjectsSection/DxfObjectsSection';
import DxfTablesSection from './Sections/TablesSection/DxfTablesSection';
import { AppIdFlags } from './Sections/TablesSection/Tables/Records/DxfAppId';
import { LayerFlags } from './Sections/TablesSection/Tables/Records/DxfRecord';
import DxfVPort from './Sections/TablesSection/Tables/Records/DxfVPort';

export default class DxfDocument implements DxfInterface {
	readonly header: DxfHeaderSection;
	readonly classes: DxfClassesSection;
	readonly tables: DxfTablesSection;
	readonly blocks: DxfBlocksSection;
	readonly entities: DxfEntitiesSection;
	readonly objects: DxfObjectsSection;
	readonly activeVPort: DxfVPort;
	readonly modelSpace: DxfBlock;
	readonly paperSpace: DxfBlock;
	currentLayerName: string;
	currentUnits: Units;

	constructor() {
		Handle.clear();
		this.header = new DxfHeaderSection();
		this.classes = new DxfClassesSection();
		this.tables = new DxfTablesSection();
		this.objects = new DxfObjectsSection();
		this.blocks = new DxfBlocksSection(this.tables, this.objects);
		this.entities = new DxfEntitiesSection(this.blocks.modelSpace);
		this.currentUnits = Units.Unitless;

		this.header.setVariable('$ACADVER', { 1: 'AC1021' });
		this.header.setVariable('$LASTSAVEDBY', { 1: '@tarikjabiri/dxf' });
		this.handseed();
		this.setUnits(Units.Unitless);

		this.tables.addLType('ByBlock', '', []);
		this.tables.addLType('ByLayer', '', []);
		const ltc = this.tables.addLType('Continuous', 'Solid line', []);
		const cl = this.tables.addLayer(
			'0',
			Colors.White,
			ltc.name,
			LayerFlags.None
		);
		this.currentLayerName = cl.name;
		const styleStandard = this.tables.addStyle('Standard');
		this.tables.addAppId('ACAD', AppIdFlags.None);
		const dimStyleStandard = this.tables.addDimStyle('Standard');
		dimStyleStandard.DIMTXSTY = styleStandard.handle;
		this.activeVPort = this.tables.addVPort('*Active');

		this.modelSpace = this.blocks.modelSpace;
		this.paperSpace = this.blocks.paperSpace;
	}

	dxify(dx: Dxifier): void {
		this.header.dxify(dx);
		this.classes.dxify(dx);
		this.tables.dxify(dx);
		this.blocks.dxify(dx);
		this.entities.dxify(dx);
		this.objects.dxify(dx);
	}

	addBlock(name: string) {
		return this.blocks.addBlock(name, this.objects);
	}

	setCurrentLayerName(name: string): void {
		const layerRecord = this.tables.layerTable.records.find(
			(layer) => layer.name === name
		);
		if (layerRecord) {
			this.currentLayerName = name;
			this.entities.setLayerName(this.currentLayerName);
			this.setCLayerVariable();
		} else throw new Error(`The '${name} layer doesn't exist!'`);
	}

	private handseed() {
		this.header.setVariable('$HANDSEED', { 5: Handle.peek() });
	}

	setUnits(units: Units) {
		this.currentUnits = units;
		this.header.setVariable('$INSUNITS', { 70: this.currentUnits });
	}

	private setCLayerVariable() {
		this.header.setVariable('$CLAYER', { 8: this.currentLayerName });
	}

	setViewCenter(center: point3d_t) {
		this.header.setVariable('$VIEWCTR', {
			10: center.x,
			20: center.y,
		});
		this.activeVPort.viewCenter = [center.x, center.y];
	}

	stringify(): string {
		const dx = new Dxifier();
		this.handseed();
		this.setViewCenter(this.modelSpace.centerView()); // fit in
		this.activeVPort.viewHeight = this.modelSpace.viewHeight();
		this.dxify(dx);
		return dx.stringify();
	}
}
