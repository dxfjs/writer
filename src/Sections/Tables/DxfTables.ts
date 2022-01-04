import DxfUcsTable from './Tables/DxfUcsTable';
import DxfViewTable from './Tables/DxfViewTable';
import DxfLayerTable from './Tables/DxfLayerTable';
import DxfStyleTable from './Tables/DxfStyleTable';
import DxfAppIdTable from './Tables/DxfAppIdTable';
import DxfLayer from './Tables/Records/DxfLayer';
import DxfLineTypeTable from './Tables/DxfLineTypeTable';
import DxfDimStyleTable from './Tables/DxfDimStyleTable';
import DxfBlockRecordTable from './Tables/DxfBlockRecordTable';
import DxfViewPortTable from './Tables/DxfViewPortTable';
import TagsManager from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DXFInterface';

export default class DxfTables implements DxfInterface {
	private readonly _dxfViewPortTable: DxfViewPortTable;
	private readonly _linetypeTable: DxfLineTypeTable;
	private readonly _layerTable: DxfLayerTable;
	private readonly _styleTable: DxfStyleTable;
	private readonly _viewTable: DxfViewTable;
	private readonly _ucsTable: DxfUcsTable;
	private readonly _appIdTable: DxfAppIdTable;
	private readonly _dimStyleTable: DxfDimStyleTable;
	private readonly _blockRecordTable: DxfBlockRecordTable;

	public get dxfViewPortTable() {
		return this._dxfViewPortTable;
	}

	public get linetypeTable() {
		return this._linetypeTable;
	}

	public get layerTable() {
		return this._layerTable;
	}

	public get styleTable() {
		return this._styleTable;
	}

	public get viewTable() {
		return this._viewTable;
	}

	public get ucsTable() {
		return this._ucsTable;
	}

	public get appIdTable() {
		return this._appIdTable;
	}

	public get dimStyleTable() {
		return this._dimStyleTable;
	}

	public get blockRecordTable() {
		return this._blockRecordTable;
	}

	public get layers(): DxfLayer[] {
		return this._layerTable.layerRecords;
	}

	public get blockRecords(): DxfBlockRecordTable {
		return this._blockRecordTable;
	}

	public constructor() {
		this._dxfViewPortTable = new DxfViewPortTable();
		this._linetypeTable = new DxfLineTypeTable();
		this._layerTable = new DxfLayerTable();
		this._styleTable = new DxfStyleTable();
		this._viewTable = new DxfViewTable();
		this._ucsTable = new DxfUcsTable();
		this._appIdTable = new DxfAppIdTable();
		this._dimStyleTable = new DxfDimStyleTable();
		this._blockRecordTable = new DxfBlockRecordTable();
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionBegin('TABLES');
		manager.appendTags(this.dxfViewPortTable);
		manager.appendTags(this.linetypeTable);
		manager.appendTags(this.layerTable);
		manager.appendTags(this.styleTable);
		manager.appendTags(this.viewTable);
		manager.appendTags(this.ucsTable);
		manager.appendTags(this.appIdTable);
		manager.appendTags(this.dimStyleTable);
		manager.appendTags(this.blockRecordTable);
		manager.sectionEnd();
		return manager;
	}

	public addLineType(name: string, descriptive: string, elements: number[]) {
		return this._linetypeTable.addLineType(name, descriptive, elements);
	}

	public addBlockRecord(name: string) {
		return this.blockRecordTable.addBlockRecord(name);
	}

	public addLayer(name: string, color: number, lineType: string) {
		if (this._linetypeTable.exist(lineType)) {
			return this._layerTable.addLayer(name, color, lineType);
		} else {
			throw new Error(
				`The lineType ${lineType} doesn't exist in the LineTypeTable.`
			);
		}
	}

	public addStyle(name: string) {
		return this._styleTable.addStyle(name);
	}

	public addView(name: string) {
		return this._viewTable.addView(name);
	}

	public addUcs(name: string) {
		return this._ucsTable.addUcs(name);
	}

	public addAppId(name: string) {
		return this._appIdTable.addAppId(name);
	}

	public addDimStyle(name: string) {
		return this._dimStyleTable.addDimStyle(name);
	}

	public addViewPort(name: string) {
		return this._dxfViewPortTable.addViewPort(name);
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
