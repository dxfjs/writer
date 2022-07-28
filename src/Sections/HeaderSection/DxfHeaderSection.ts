import DxfVariable, { values_t } from './DxfVariable';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import { Dxifier } from '../../Internals/Dxifier';

export default class DxfHeaderSection implements DxfInterface {
	readonly variables: DxfVariable[] = [];

	setVariable(name: string, values: values_t) {
		const variable = this.variables.find((v) => v.name === name);
		if (variable) {
			variable.values = values;
		} else {
			this.variables.push(new DxfVariable(name, values));
		}
	}

	dxify(mg: Dxifier) {
		mg.start('HEADER');
		for (const variable of this.variables) {
			variable.dxify(mg);
		}
		mg.end();
	}
}
