import { StringBuilder } from './StringBuilder';
import { point2d, point2d_t, point3d_t } from './Utils';

export type tag_t = {
	code: number;
	value: number | string;
};

export const createGroupCode = (
	firstDigits: number,
	lastDigit: number
): number => {
	return parseInt(`${firstDigits}${lastDigit}`);
};

export class Dxifier {
	readonly sb: StringBuilder;

	constructor() {
		this.sb = new StringBuilder();
	}

	push(code: number, value?: string | number) {
		if (value !== undefined && value !== null) this.sb.push(code, value);
	}

	stringify() {
		return this.sb.stringify();
	}

	start(name: string) {
		this.push(0, 'SECTION');
		this.push(2, name);
	}

	end() {
		this.push(0, 'ENDSEC');
	}

	variable(name: string) {
		this.push(9, name);
	}

	type(entityType: string) {
		this.push(0, entityType);
	}

	primaryText(primaryText: string) {
		this.push(1, primaryText);
	}

	name(name: string, code = 2) {
		this.push(code, name);
	}

	handle(handle: string) {
		this.push(5, handle);
	}

	lineType(lineType?: string) {
		this.push(6, lineType);
	}

	textStyle(textStyle: string) {
		this.push(7, textStyle);
	}

	layerName(layerName: string) {
		this.push(8, layerName);
	}

	variableName(variableName: string) {
		this.push(9, variableName);
	}

	point2d(point: point2d_t, lastDigit = 0) {
		this.push(createGroupCode(1, lastDigit), point.x);
		this.push(createGroupCode(2, lastDigit), point.y);
	}

	point3d(point: point3d_t, lastDigit = 0) {
		this.point2d(point2d(point.x, point.y), lastDigit);
		this.push(createGroupCode(3, lastDigit), point.z);
	}

	elevation(elevation?: number) {
		this.push(38, elevation);
	}

	thickness(thickness?: number) {
		this.push(39, thickness);
	}

	visibilty(visibilty?: boolean) {
		if (visibilty !== undefined) this.push(60, visibilty ? 0 : 1);
	}

	colorNumber(colorNumber?: number) {
		this.push(62, colorNumber);
	}

	subclassMarker(subclassMarker?: string) {
		this.push(100, subclassMarker);
	}
}
