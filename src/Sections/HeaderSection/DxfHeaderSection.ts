import DxfVariable, { values_t } from './DxfVariable';
import TagsManager from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';

export default class DxfHeaderSection implements DxfInterface {
	static #instance: DxfHeaderSection;
	readonly variables: DxfVariable[] = [];

	static getInstance(): DxfHeaderSection {
		if (!this.#instance) this.#instance = new DxfHeaderSection();
		return this.#instance;
	}

	setVariable(name: string, values: values_t) {
		const variable = this.variables.find((v) => v.name === name);
		if (variable) {
			variable.values = values;
		} else {
			this.variables.push(new DxfVariable(name, values));
		}
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionStart('HEADER');
		this.variables.forEach((variable) => {
			manager.pushTags(variable.manager.tags);
		});
		manager.sectionEnd();
		return manager;
	}

	stringify(): string {
		return this.manager.stringify();
	}
}
