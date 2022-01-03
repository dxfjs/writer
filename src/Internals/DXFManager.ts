import Tag, { makeArrayTags, makeTag } from './Tag';
import DxfInterface from './Interfaces/DXFInterface';
import TagsManager from './TagsManager';

export default class DXFManager {
	get handle(): string {
		return this._handle;
	}

	set handle(value: string) {
		this._handle = value;
	}

	static currentTrueColor: number = NaN;

	static setTrueColorRGB = (red: number, green: number, blue: number) => {
		DXFManager.setTrueColorHex(
			[red, green, blue]
				.map((component) => {
					const hex = component.toString(16);
					return hex.length === 1 ? `0${hex}` : hex;
				})
				.join('')
		);
	};

	static setTrueColorHex = (hex: string) => {
		DXFManager.currentTrueColor = parseInt(`00${hex.replace('#', '')}`, 16);
	};

	static unsetTrueColor = () => {
		DXFManager.currentTrueColor = NaN;
	};

	static versions = {
		R12: 'AC1009',
		R13: 'AC1012',
		R14: 'AC1014',
		R2000: 'AC1015',
		R2004: 'AC1018',
		R2007: 'AC1021',
		R2010: 'AC1024',
		R2013: 'AC1027',
		R2018: 'AC1032',
	};
	static colors = {
		Red: 1,
		Green: 3,
		Cyan: 4,
		Blue: 5,
		Magenta: 6,
		White: 7,
		Black: 0,
		Yellow: 2,
	};
	static units = {
		Unitless: 0,
		Inches: 1,
		Feet: 2,
		Miles: 3,
		Millimeters: 4,
		Centimeters: 5,
		Meters: 6,
		Kilometers: 7,
		Microinches: 8,
		Mils: 9,
		Yards: 10,
		Angstroms: 11,
		Nanometers: 12,
		Microns: 13,
		Decimeters: 14,
		Decameters: 15,
		Hectometers: 16,
		Gigameters: 17,
		AstronomicalUnits: 18,
		LightYears: 19,
		Parsecs: 20,
		USSurveyFeet: 21,
		USSurveyInch: 22,
		USSurveyYard: 23,
		USSurveyMile: 24,
	};
	static version: string;
	static handleSeed: number = 0;
	private _handle: string;
	static currentLayer: string = '0';

	public constructor() {
		this._handle = this.handleSeed();
		DXFManager.version = DXFManager.versions.R2007;
	}

	public isInteger = (value: number): boolean => {
		return Number(value) === value && value % 1 === 0;
	};

	public isFloat = (value: number): boolean => {
		return Number(value) === value && value % 1 !== 0;
	};

	public isSupported = (version: string): boolean => {
		const dxfVersion = parseInt(DXFManager.version.replace('AC', ''));
		const tagVersion = parseInt(version.replace('AC', ''));

		return tagVersion <= dxfVersion;
	};

	public handleSeed = (): string => {
		DXFManager.handleSeed++;
		return DXFManager.handleSeed.toString(16).toUpperCase();
	};

	tags(): Tag[] {
		return [];
	}

	public stringify(): string {
		return this.tags().reduce((str, tag) => {
			if (this.isSupported(tag.version)) {
				return `${str}${tag.stringify()}`;
			}
			return str;
		}, '');
	}

	public colorTag = (index: number): Tag[] => {
		return makeArrayTags(62, index);
	};

	public entityTypeTag = (name: string): Tag[] => {
		return makeArrayTags(0, name);
	};

	public handleTag = (handle: string): Tag[] => {
		return makeArrayTags(5, handle, 'AC1012');
	};

	public layerTag = (layer: string): Tag[] => {
		return makeArrayTags(8, layer);
	};

	public lineTypeTag = (lineType: string): Tag[] => {
		return makeArrayTags(6, lineType);
	};

	public nameTag = (name: string, groupCode: number = 2): Tag[] => {
		return makeArrayTags(groupCode, name);
	};

	public pointTag = (
		x: number,
		y: number,
		z: number = 0,
		digit: number = 0
	): Tag[] => {
		return [
			makeTag(parseInt(`1${digit}`), x),
			makeTag(parseInt(`2${digit}`), y),
			makeTag(parseInt(`3${digit}`), z),
		];
	};

	public createTags = (tags: [number, number | string][]): Tag[] => {
		return tags.map((tag) => {
			const [groupCode, value] = tag;
			return makeTag(groupCode, value);
		});
	};

	public subclassMarkerTag = (subclass: string): Tag[] => {
		return makeArrayTags(100, subclass);
	};
	public textStyleTag = (textStyleName: string): Tag[] => {
		return makeArrayTags(7, textStyleName);
	};

	public thicknessTag = (thickness: number): Tag[] => {
		return makeArrayTags(39, thickness);
	};

	public trueColorTag = (
		red: number,
		green: number,
		blue: number,
		digit: number = 0
	): Tag[] => {
		return makeArrayTags(
			parseInt(`42${digit}`),
			this.getACADTrueColor(red, green, blue)
		);
	};

	private getACADTrueColor = (red: number, green: number, blue: number) =>
		parseInt(
			'00' +
				[red, green, blue]
					.map((component) => {
						const hex = component.toString(16);
						return hex.length === 1 ? '0' + hex : hex;
					})
					.join(''),
			16
		);
}
