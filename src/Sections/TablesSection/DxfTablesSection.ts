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

export default class DxfTablesSection implements DxfInterface {
	static #instance: DxfTablesSection;
	readonly dxfViewPortTable: DxfViewPortTable;
	readonly linetypeTable: DxfLineTypeTable;
	readonly layerTable: DxfLayerTable;
	readonly styleTable: DxfStyleTable;
	readonly viewTable: DxfViewTable;
	readonly ucsTable: DxfUcsTable;
	readonly appIdTable: DxfAppIdTable;
	readonly dimStyleTable: DxfDimStyleTable;
	readonly blockRecordTable: DxfBlockRecordTable;

	private constructor() {
		this.dxfViewPortTable = DxfViewPortTable.getInstance();
		this.linetypeTable = DxfLineTypeTable.getInstance();
		this.layerTable = DxfLayerTable.getInstance();
		this.styleTable = DxfStyleTable.getInstance();
		this.viewTable = DxfViewTable.getInstance();
		this.ucsTable = DxfUcsTable.getInstance();
		this.appIdTable = DxfAppIdTable.getInstance();
		this.dimStyleTable = DxfDimStyleTable.getInstance();
		this.blockRecordTable = DxfBlockRecordTable.getInstance();
	}

	public static getInstance(): DxfTablesSection {
		if (!this.#instance) this.#instance = new DxfTablesSection();
		return this.#instance;
	}

	public get manager(): TagsManager {
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

	public addStyle(name: string) {
		return this.styleTable.addStyle(name);
	}

	public addView(name: string) {
		return this.viewTable.addView(name);
	}

	public addUcs(name: string) {
		return this.ucsTable.addUcs(name);
	}

	public addAppId(name: string, flags?: number) {
		return this.appIdTable.addAppId(name, flags);
	}

	public addDimStyle(name: string, flags?: number) {
		return this.dimStyleTable.addDimStyle(name, flags);
	}

	public addViewPort(name: string) {
		return this.dxfViewPortTable.addViewPort(name);
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
