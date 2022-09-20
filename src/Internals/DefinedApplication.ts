import { Dxfier, tag_t } from './Dxfier';
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

	dxfy(dx: Dxfier) {
		dx.push(102, `{${this.name}`);
		for (const tag of this.tags) {
			dx.push(tag.code, tag.value);
		}
		dx.push(102, `}`);
	}
}
