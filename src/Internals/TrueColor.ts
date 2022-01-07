import { createGroupCode, tag } from './TagsManager';

export default class TrueColor {
	private _color: number;

	public get color(): number {
		return this._color;
	}

	public trueColorTag(lastDigit: number = 0) {
		return tag(createGroupCode(42, lastDigit), this.color);
	}

	public constructor(hexColor: string) {
		this._color = parseInt(`00${hexColor.replace('#', '')}`, 16);
	}

	static rgbToHex(r: number, g: number, b: number) {
		return [r, g, b]
			.map((component) => {
				const hex = component.toString(16);
				return hex.length === 1 ? `0${hex}` : hex;
			})
			.join('');
	}
}
