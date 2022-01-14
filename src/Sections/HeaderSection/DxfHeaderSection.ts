import DxfVariable, { values_t } from './DxfVariable';
import TagsManager from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';

export default class DxfHeaderSection implements DxfInterface {
	private static _instance: DxfHeaderSection;
	private readonly _variables: DxfVariable[] = [];

	public get variables(): DxfVariable[] {
		return this._variables;
	}

	private constructor() {}

	public static getInstance(): DxfHeaderSection {
		if (!this._instance) this._instance = new DxfHeaderSection();
		return this._instance;
	}

	public setVariable(name: string, values: values_t) {
		let variable = this.variables.find((v) => v.name === name);
		if (variable) {
			variable.values = values;
		} else {
			this.variables.push(new DxfVariable(name, values));
		}
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionBegin('HEADER');
		this.variables.forEach((variable) => {
			manager.pushTags(variable.manager.tags);
		});
		manager.sectionEnd();
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
