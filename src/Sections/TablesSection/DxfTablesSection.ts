import DxfUcsTable from './Tables/DxfUcsTable';
import DxfViewTable from './Tables/DxfViewTable';
import DxfLayerTable from './Tables/DxfLayerTable';
import DxfStyleTable from './Tables/DxfStyleTable';
import DxfAppIdTable from './Tables/DxfAppIdTable';
import DxfLineTypeTable from './Tables/DxfLineTypeTable';
import DxfDimStyleTable from './Tables/DxfDimStyleTable';
import DxfBlockRecordTable from './Tables/DxfBlockRecordTable';
import DxfViewPortTable from './Tables/DxfViewPortTable';
import TagsManager from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import DxfStyle from './Tables/Records/DxfStyle';
import DxfView, { ViewArgs } from './Tables/Records/DxfView';
import DxfUcs from './Tables/Records/DxfUcs';
import DxfAppId from './Tables/Records/DxfAppId';
import DxfDimStyle from './Tables/Records/DxfDimStyle';
import DxfViewPort from './Tables/Records/DxfViewPort';

export default class DxfTablesSection implements DxfInterface {
	readonly dxfViewPortTable: DxfViewPortTable;
	readonly linetypeTable: DxfLineTypeTable;
	readonly layerTable: DxfLayerTable;
	readonly styleTable: DxfStyleTable;
	readonly viewTable: DxfViewTable;
	readonly ucsTable: DxfUcsTable;
	readonly appIdTable: DxfAppIdTable;
	readonly dimStyleTable: DxfDimStyleTable;
	readonly blockRecordTable: DxfBlockRecordTable;

	constructor() {
		this.dxfViewPortTable = new DxfViewPortTable();
		this.linetypeTable = new DxfLineTypeTable();
		this.layerTable = new DxfLayerTable(this.linetypeTable);
		this.styleTable = new DxfStyleTable();
		this.viewTable = new DxfViewTable();
		this.ucsTable = new DxfUcsTable();
		this.appIdTable = new DxfAppIdTable();
		this.dimStyleTable = new DxfDimStyleTable();
		this.blockRecordTable = new DxfBlockRecordTable();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionStart('TABLES');
		manager.append(this.dxfViewPortTable);
		manager.append(this.linetypeTable);
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

	public addLineType(
		name: string,
		descriptive: string,
		elements: number[],
		flags?: number
	) {
		return this.linetypeTable.addLineType(
			name,
			descriptive,
			elements,
			flags
		);
	}

	public addBlockRecord(name: string) {
		return this.blockRecordTable.addBlockRecord(name);
	}

	public addLayer(
		name: string,
		color: number,
		lineType: string,
		flags?: number
	) {
		if (this.linetypeTable.exist(lineType)) {
			return this.layerTable.addLayer(name, color, lineType, flags);
		} else {
			throw new Error(`The lineType ${lineType} doesn't exist.`);
		}
	}

	public addStyle(name: string): DxfStyle {
		return this.styleTable.addStyle(name);
	}

	public addView(args: ViewArgs): DxfView {
		return this.viewTable.addView(args);
	}

	public addUcs(name: string): DxfUcs {
		return this.ucsTable.addUcs(name);
	}

	public addAppId(name: string, flags?: number): DxfAppId {
		return this.appIdTable.addAppId(name, flags);
	}

	public addDimStyle(name: string, flags?: number): DxfDimStyle {
		return this.dimStyleTable.addDimStyle(name, flags);
	}

	public addViewPort(name: string): DxfViewPort {
		return this.dxfViewPortTable.addViewPort(name);
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
