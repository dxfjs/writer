import { createGroupCode, tag } from './TagsManager';

export default class Handle {
	static seed: number = 0;

	public static handleSeed() {
		return (++Handle.seed).toString(16).toUpperCase();
	}

	/**
	 * @returns The next handle without incrementing the seed.
	 */
	public static nextHandle() {
		const seed = Handle.seed + 1;
		return seed.toString(16).toUpperCase();
	}

	private _handle: string = Handle.handleSeed();

	private _softOwner: string | null = null;
	private _hardOwner: string | null = null;
	private _softPointer: string | null = null;
	private _hardPointer: string | null = null;

	public constructor() {}

	public get handle(): string {
		return this._handle;
	}

	public set softOwner(value: string | null) {
		this._softOwner = value;
	}

	public set hardOwner(value: string | null) {
		this._hardOwner = value;
	}

	public set softPointer(value: string | null) {
		this._softPointer = value;
	}

	public set hardPointer(value: string | null) {
		this._hardPointer = value;
	}

	public softPointerTag(lastDigit: number = 0) {
		if (this._softPointer)
			return tag(createGroupCode(33, lastDigit), this._softPointer);
		return null;
	}

	public hardPointerTag(lastDigit: number = 0) {
		if (this._hardPointer)
			return tag(createGroupCode(34, lastDigit), this._hardPointer);
		return null;
	}

	public softOwnerTag(lastDigit: number = 0) {
		if (this._softOwner)
			return tag(createGroupCode(35, lastDigit), this._softOwner);
		return null;
	}

	public hardOwnerTag(lastDigit: number = 0) {
		if (this._hardOwner)
			return tag(createGroupCode(36, lastDigit), this._hardOwner);
		return null;
	}
}
