import { createGroupCode, tag } from './TagsManager';

export default class Handle {
	static #seed: number = 0;

	static next(): string {
		return (++Handle.#seed).toString(16).toUpperCase();
	}

	static peek(): string {
		return (Handle.#seed + 1).toString(16).toUpperCase();
	}

	readonly handle: string = Handle.next();

	softOwner?: string;
	hardOwner?: string;
	softPointer?: string;
	hardPointer?: string;

	public constructor() {}

	public softPointerTag(lastDigit: number = 0) {
		if (this.softPointer)
			return tag(createGroupCode(33, lastDigit), this.softPointer);
		return null;
	}

	public hardPointerTag(lastDigit: number = 0) {
		if (this.hardPointer)
			return tag(createGroupCode(34, lastDigit), this.hardPointer);
		return null;
	}

	public softOwnerTag(lastDigit: number = 0) {
		if (this.softOwner)
			return tag(createGroupCode(35, lastDigit), this.softOwner);
		return null;
	}

	public hardOwnerTag(lastDigit: number = 0) {
		if (this.hardOwner)
			return tag(createGroupCode(36, lastDigit), this.hardOwner);
		return null;
	}
}
