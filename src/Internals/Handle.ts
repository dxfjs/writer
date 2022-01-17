import { createGroupCode, tag } from './TagsManager';

export default class Handle {
	static #seed: number = 0;

	public static handleSeed(): string {
		return (++Handle.#seed).toString(16).toUpperCase();
	}

	/**
	 * @returns The next handle without incrementing the seed.
	 */
	public static nextHandle() {
		const seed = Handle.#seed + 1;
		return seed.toString(16).toUpperCase();
	}

	readonly handle: string = Handle.handleSeed();

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
