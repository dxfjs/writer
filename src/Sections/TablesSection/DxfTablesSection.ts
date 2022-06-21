import DxfUcsTable from './Tables/DxfUcsTable';
import DxfViewTable from './Tables/DxfViewTable';
import DxfLayerTable from './Tables/DxfLayerTable';
import DxfStyleTable from './Tables/DxfStyleTable';
import DxfAppIdTable from './Tables/DxfAppIdTable';
import DxfLTypeTable from './Tables/DxfLTypeTable';
import DxfDimStyleTable from './Tables/DxfDimStyleTable';
import DxfBlockRecordTable from './Tables/DxfBlockRecordTable';
import DxfVPortTable from './Tables/DxfVPortTable';
import TagsManager from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import DxfStyle from './Tables/Records/DxfStyle';
import DxfView, { ViewArgs } from './Tables/Records/DxfView';
import DxfUcs from './Tables/Records/DxfUcs';
import DxfAppId, { AppIdFlags } from './Tables/Records/DxfAppId';
import DxfDimStyle from './Tables/Records/DxfDimStyle';
import DxfVPort from './Tables/Records/DxfVPort';
import { LayerFlags } from './Tables/Records/DxfRecord';

export default class DxfTablesSection implements DxfInterface {
	readonly vPortTable: DxfVPortTable;
	readonly ltypeTable: DxfLTypeTable;
	readonly layerTable: DxfLayerTable;
	readonly styleTable: DxfStyleTable;
	readonly viewTable: DxfViewTable;
	readonly ucsTable: DxfUcsTable;
	readonly appIdTable: DxfAppIdTable;
	readonly dimStyleTable: DxfDimStyleTable;
	readonly blockRecordTable: DxfBlockRecordTable;

	constructor() {
		this.vPortTable = new DxfVPortTable();
		this.ltypeTable = new DxfLTypeTable();
		this.layerTable = new DxfLayerTable(this.ltypeTable);
		this.styleTable = new DxfStyleTable();
		this.viewTable = new DxfViewTable();
		this.ucsTable = new DxfUcsTable();
		this.appIdTable = new DxfAppIdTable();
		this.dimStyleTable = new DxfDimStyleTable();
		this.blockRecordTable = new DxfBlockRecordTable();
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionStart('TABLES');
		manager.append(this.vPortTable);
		manager.append(this.ltypeTable);
		manager.append(this.layerTable);
		manager.append(this.styleTable);
		manager.append(this.viewTable);
		manager.append(this.ucsTable);
		manager.append(this.appIdTable);
		manager.append(this.dimStyleTable);
		manager.append(this.blockRecordTable);
		manager.sectionEnd();
		return manager;
	}

	addLType(
		name: string,
		descriptive: string,
		elements: number[],
		flags?: number
	) {
		return this.ltypeTable.addLType(name, descriptive, elements, flags);
	}

	addBlockRecord(name: string) {
		return this.blockRecordTable.addBlockRecord(name);
	}

	addLayer(
		name: string,
		color: number,
		lineType: string,
		flags?: LayerFlags
	) {
		if (this.ltypeTable.exist(lineType))
			return this.layerTable.addLayer(name, color, lineType, flags);
		throw new Error(`The lineType ${lineType} doesn't exist.`);
	}

	addStyle(name: string): DxfStyle {
		return this.styleTable.addStyle(name);
	}

	addView(args: ViewArgs): DxfView {
		return this.viewTable.addView(args);
	}

	addUcs(name: string): DxfUcs {
		return this.ucsTable.addUcs(name);
	}

	addAppId(name: string, flags?: AppIdFlags): DxfAppId {
		return this.appIdTable.addAppId(name, flags);
	}

	addDimStyle(name: string, flags?: number): DxfDimStyle {
		return this.dimStyleTable.addDimStyle(name, flags);
	}

	addVPort(name: string): DxfVPort {
		return this.vPortTable.addViewPort(name);
	}

	stringify(): string {
		return this.manager.stringify();
	}
}
