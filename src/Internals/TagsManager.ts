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

	public appendTags(dxfEntity: DxfInterface) {
		this.pushTags(dxfEntity.manager.tags);
	}

	public addTag(groupCode: number, value?: number | string) {
		if (value !== undefined) this.pushTag(tag(groupCode, value));
	}

	public pushTag(tag: tag_t | null) {
		if (tag) this.tags.push(tag);
	}

	public pushTags(tags: tag_t[]) {
		for (let tag of tags) {
			this.tags.push(tag);
		}
	}

	public entityType(entityType: string) {
		this.addTag(0, entityType);
	}

	public primaryText(primaryText: string) {
		this.addTag(1, primaryText);
	}

	public name(name: string, groupCode: number = 2) {
		this.addTag(groupCode, name);
	}

	public handle(handle: string) {
		this.addTag(5, handle);
	}

	public lineType(lineType: string | undefined) {
		this.addTag(6, lineType);
	}

	public textStyle(textStyle: string) {
		this.addTag(7, textStyle);
	}

	public layerName(layerName: string) {
		this.addTag(8, layerName);
	}

	public variableName(variableName: string) {
		this.addTag(9, variableName);
	}

	public point2d(point: point2d_t, lastDigit: number = 0) {
		this.pushTags([
			tag(createGroupCode(1, lastDigit), point.x),
			tag(createGroupCode(2, lastDigit), point.y),
		]);
	}

	public point3d(point: point3d_t, lastDigit: number = 0) {
		this.pushTags([
			tag(createGroupCode(1, lastDigit), point.x),
			tag(createGroupCode(2, lastDigit), point.y),
			tag(createGroupCode(3, lastDigit), point.z),
		]);
	}

	public elevation(elevation: number | undefined) {
		this.addTag(38, elevation);
	}

	public thickness(thickness: number | undefined) {
		this.addTag(39, thickness);
	}

	public visibilty(visibilty: boolean | undefined) {
		if (visibilty === undefined) return;
		this.addTag(60, visibilty ? 0 : 1);
	}

	public colorNumber(colorNumber: number | undefined) {
		this.addTag(62, colorNumber);
	}

	public entitiesFollowFlag(entitiesFollowFlag: number) {
		this.addTag(66, entitiesFollowFlag);
	}

	public subclassMarker(subclassMarker: string | undefined) {
		this.addTag(100, subclassMarker);
	}

	public softPointer(softPointer: string, lastDigit: number = 0) {
		this.addTag(createGroupCode(33, lastDigit), softPointer);
	}

	public hardPointer(hardPointer: string, lastDigit: number = 0) {
		this.addTag(createGroupCode(34, lastDigit), hardPointer);
	}

	public softOwner(softOwner: string, lastDigit: number = 0) {
		this.addTag(createGroupCode(35, lastDigit), softOwner);
	}

	public hardOwner(hardOwner: string, lastDigit: number = 0) {
		this.addTag(createGroupCode(36, lastDigit), hardOwner);
	}

	public stringify(): string {
		return this.tags.reduce((str, tag) => {
			return `${str}${stringifyTag(tag)}`;
		}, '');
	}

	public sectionBegin(name: string) {
		this.entityType('SECTION');
		this.name(name);
	}

	public sectionEnd() {
		this.entityType('ENDSEC');
	}
}
