function toFixed(value: number) {
	if (Math.abs(value) < 1.0) {
		const exp = parseInt(value.toString().split('-')[1]);
		if (exp) {
			return value.toFixed(exp);
		}
	}
	return value;
}

export const makeTag = (
	groupCode: number,
	value: number | string = '',
	version: string = 'AC1009',
	nullable: boolean = true
) => {
	return new Tag(groupCode, value, version, nullable);
};

export const makeArrayTags = (
	groupCode: number,
	value: number | string = '',
	version: string = 'AC1009',
	nullable: boolean = true
) => {
	return [new Tag(groupCode, value, version, nullable)];
};

/**
 * Tag class
 */
export default class Tag {
	get groupCode(): number {
		return this._groupCode;
	}
	get nullable(): boolean {
		return this._nullable;
	}

	get value(): number | string {
		return this._value;
	}

	get version(): string {
		return this._version;
	}

	set groupCode(value: number) {
		this._groupCode = value;
	}

	set nullable(value: boolean) {
		this._nullable = value;
	}

	set value(value: number | string) {
		this._value = value;
	}

	set version(value: string) {
		this._version = value;
	}

	private _groupCode: number;
	private _nullable: boolean;
	private _value: number | string;
	private _version: string;

	public constructor(
		groupCode: number,
		value: number | string = '',
		version: string = 'AC1009',
		nullable: boolean = true
	) {
		this._nullable = nullable;
		this._version = version;
		this._groupCode = groupCode;
		this._value = value;
	}
	public stringify(): string {
		if (this.nullable || this.value !== '') {
			if (typeof this.value === 'number') {
				return `  ${this.groupCode}\n${toFixed(this.value)}\n`;
			}
			// Do not remove the tow spaces in the string 👍 I like them
			return `  ${this.groupCode}\n${this.value}\n`;
		}
		return '';
	}
}
