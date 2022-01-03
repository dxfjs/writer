import DxfInterface from '../../Internals/Interfaces/DXFInterface';
import TagsManager from '../../Internals/TagsManager';

export type values_t = {
	[key: number]: number | string;
};

export default class DxfVariable implements DxfInterface {
	private readonly _name: string;
	private _values: values_t;

	public get name(): string {
		return this._name;
	}

	public get values(): values_t {
		return this._values;
	}

	public set values(value: values_t) {
		this._values = value;
	}

	public constructor(name: string, values: values_t) {
		this._values = values;
		this._name = name;
	}

	public stringify(): string {
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();

		manager.variableName(this.name);
		Object.entries(this.values).forEach((entry) => {
			const [groupCode, value] = entry;
			manager.addTag(parseInt(groupCode), value);
		});

		return manager;
	}
}
