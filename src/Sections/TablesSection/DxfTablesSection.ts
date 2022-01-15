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
import DxfInterface from '../../Internals/Interfaces/DxfInterface';

export default class DxfTablesSection implements DxfInterface {
	private static _instance: DxfTablesSection;
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

	private constructor() {
		this._dxfViewPortTable = DxfViewPortTable.getInstance();
		this._linetypeTable = DxfLineTypeTable.getInstance();
		this._layerTable = DxfLayerTable.getInstance();
		this._styleTable = DxfStyleTable.getInstance();
		this._viewTable = DxfViewTable.getInstance();
		this._ucsTable = DxfUcsTable.getInstance();
		this._appIdTable = DxfAppIdTable.getInstance();
		this._dimStyleTable = DxfDimStyleTable.getInstance();
		this._blockRecordTable = DxfBlockRecordTable.getInstance();
	}

	public static getInstance(): DxfTablesSection {
		if (!this._instance) this._instance = new DxfTablesSection();
		return this._instance;
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

	public addAppId(name: string, flags: number) {
		return this._appIdTable.addAppId(name, flags);
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
