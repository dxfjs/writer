import DxfUcsTable from './Tables/DxfUcsTable';
import DxfViewTable from './Tables/DxfViewTable';
import DxfLayerTable from './Tables/DxfLayerTable';
import DxfStyleTable from './Tables/DxfStyleTable';
import DxfAppIdTable from './Tables/DxfAppIdTable';
import Entities from '../Entities/Entities';
import DxfLayer from './Tables/Records/DxfLayer';
import DxfLineTypeTable from './Tables/DxfLineTypeTable';
import DxfDimStyleTable from './Tables/DxfDimStyleTable';
import DxfBlockRecordTable from './Tables/DxfBlockRecordTable';
import DxfViewPortTable from './Tables/DxfViewPortTable';
import DxfViewPort from './Tables/Records/DxfViewPort';
import TagsManager, { tag_t } from '../../Internals/TagsManager';

export default class DxfTables {
	private readonly _dxfViewPortTable: DxfViewPortTable;
	private readonly _linetypeTable: DxfLineTypeTable;
	private readonly _layerTable: DxfLayerTable;
	private readonly _styleTable: DxfStyleTable;
	private readonly _viewTable: DxfViewTable;
	private readonly _ucsTable: DxfUcsTable;
	private readonly _appIdTable: DxfAppIdTable;
	private readonly _dimStyleTable: DxfDimStyleTable;
	private readonly _blockRecordTable: DxfBlockRecordTable;

	private _entities: Entities = new Entities();

	private readonly _activeViewPort: DxfViewPort;

	public get activeViewPort(): DxfViewPort {
		return this._activeViewPort;
	}

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

	public get entities(): Entities {
		return this._entities;
	}

	public set entities(entities: Entities) {
		this._entities = entities;
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

		this.addLineType('ByBlock', '', []);
		this.addLineType('ByLayer', '', []);
		this.addLineType('Continuous', 'Solid line', []);

		this.addLayer('0', 7, 'Continuous');

		this.addStyle('Standard');

		this.addAppId('ACAD');

		this.addDimStyle('Standard');

		this._activeViewPort = this.addViewPort('*Active');
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

	public setViewHeight(viewHeight: number) {
		this.activeViewPort.viewHeight = viewHeight;
	}

	public setViewCenter(viewCenter: [number, number]) {
		this.activeViewPort.viewCenter = viewCenter;
	}

	public tags(): tag_t[] {
		const [x, y] = this.entities.centerView();
		this.setViewCenter([x || 0, y || 0]);
		this.setViewHeight(this.entities.viewHeight());

		const manager = new TagsManager();
		manager.sectionBegin('TABLES');
		manager.pushTags(this.dxfViewPortTable.tags());
		manager.pushTags(this.linetypeTable.tags());
		manager.pushTags(this.layerTable.tags());
		manager.pushTags(this.styleTable.tags());
		manager.pushTags(this.viewTable.tags());
		manager.pushTags(this.ucsTable.tags());
		manager.pushTags(this.appIdTable.tags());
		manager.pushTags(this.dimStyleTable.tags());
		manager.pushTags(this.blockRecordTable.tags());
		manager.sectionEnd();
		return manager.tags;
	}

	public stringify(): string {
		const manager = new TagsManager();
		manager.pushTags(this.tags());
		return manager.stringify();
	}
}
