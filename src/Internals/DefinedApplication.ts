import { Dxifier, tag_t } from './Dxifier';
import DxfInterface from './Interfaces/DxfInterface';

export default class DxfDefinedApplication implements DxfInterface {
	readonly name: string;
	readonly tags: tag_t[];

	constructor(name: string) {
		this.name = name;
		this.tags = [];
	}

	add(code: number, value: string) {
		this.tags.push({ code, value });
	}

	dxify(mg: Dxifier) {
		mg.push(102, `{${this.name}`);
		for (const tag of this.tags) {
			mg.push(tag.code, tag.value);
		}
		mg.push(102, `}`);
	}
}
