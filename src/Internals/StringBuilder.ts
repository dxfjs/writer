export class StringBuilder {
	tags: (number | string)[];

	constructor() {
		this.tags = [];
	}

	push(code: number, value: number | string) {
		this.tags.push(code, value);
	}

	stringify() {
		return this.tags.join('\n');
	}
}
