import DxfInterface from './Interfaces/DxfInterface';

export type tag_t = {
	groupCode: number;
	value: number | string;
};

/**
 * @public
 */
export type point3d_t = {
	x: number;
	y: number;
	z: number;
};

/**
 * @public
 */
export type point2d_t = {
	x: number;
	y: number;
};

/**
 * @public
 */
export function point3d(x: number, y: number, z: number): point3d_t {
	return { x, y, z };
}

/**
 * @public
 */
export function point2d(x: number, y: number): point2d_t {
	return { x, y };
}

export const tag = (groupCode: number, value: number | string): tag_t => {
	return {
		groupCode,
		value,
	};
};

export const stringifyTag = (tag: tag_t) => {
	return `  ${tag.groupCode}\n${tag.value}\n`;
};

export const createGroupCode = (
	firstDigits: number,
	lastDigit: number
): number => {
	return parseInt(`${firstDigits}${lastDigit}`);
};

export default class TagsManager {
	readonly tags: tag_t[] = [];

	appendTags(dxfEntity: DxfInterface) {
		this.pushTags(dxfEntity.manager.tags);
	}

	addTag(groupCode: number, value?: number | string) {
		if (value !== undefined) this.pushTag(tag(groupCode, value));
	}

	pushTag(tag: tag_t | null) {
		if (tag) this.tags.push(tag);
	}

	pushTags(tags: tag_t[]) {
		for (const tag of tags) {
			this.tags.push(tag);
		}
	}

	entityType(entityType: string) {
		this.addTag(0, entityType);
	}

	primaryText(primaryText: string) {
		this.addTag(1, primaryText);
	}

	name(name: string, groupCode = 2) {
		this.addTag(groupCode, name);
	}

	handle(handle: string) {
		this.addTag(5, handle);
	}

	lineType(lineType: string | undefined) {
		this.addTag(6, lineType);
	}

	textStyle(textStyle: string) {
		this.addTag(7, textStyle);
	}

	layerName(layerName: string) {
		this.addTag(8, layerName);
	}

	variableName(variableName: string) {
		this.addTag(9, variableName);
	}

	point2d(point: point2d_t, lastDigit = 0) {
		this.pushTags([
			tag(createGroupCode(1, lastDigit), point.x),
			tag(createGroupCode(2, lastDigit), point.y),
		]);
	}

	point3d(point: point3d_t, lastDigit = 0) {
		this.pushTags([
			tag(createGroupCode(1, lastDigit), point.x),
			tag(createGroupCode(2, lastDigit), point.y),
			tag(createGroupCode(3, lastDigit), point.z),
		]);
	}

	elevation(elevation: number | undefined) {
		this.addTag(38, elevation);
	}

	thickness(thickness: number | undefined) {
		this.addTag(39, thickness);
	}

	visibilty(visibilty: boolean | undefined) {
		if (visibilty === undefined) return;
		this.addTag(60, visibilty ? 0 : 1);
	}

	colorNumber(colorNumber: number | undefined) {
		this.addTag(62, colorNumber);
	}

	subclassMarker(subclassMarker: string | undefined) {
		this.addTag(100, subclassMarker);
	}

	stringify(): string {
		return this.tags.reduce((str, tag) => {
			return `${str}${stringifyTag(tag)}`;
		}, '');
	}

	sectionStart(name: string) {
		this.entityType('SECTION');
		this.name(name);
	}

	sectionEnd() {
		this.entityType('ENDSEC');
	}
}
