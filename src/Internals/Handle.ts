export default class Handle {
	static #seed = 0;

	static next(): string {
		return (++Handle.#seed).toString(16).toUpperCase();
	}

	static peek(): string {
		return (Handle.#seed + 1).toString(16).toUpperCase();
	}
}
