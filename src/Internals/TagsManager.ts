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

	append(dxfEntity: DxfInterface) {
		this.push(dxfEntity.manager.tags);
	}

	add(groupCode: number, value?: number | string) {
		value && this.push(tag(groupCode, value));
	}

	push(tags: tag_t | tag_t[] | null) {
		if (tags) {
			if (Array.isArray(tags)) {
				for (const tag of tags) {
					this.tags.push(tag);
				}
			} else {
				this.tags.push(tags);
			}
		}
	}

	entityType(entityType: string) {
		this.add(0, entityType);
	}

	primaryText(primaryText: string) {
		this.add(1, primaryText);
	}

	name(name: string, groupCode = 2) {
		this.add(groupCode, name);
	}

	handle(handle: string) {
		this.add(5, handle);
	}

	lineType(lineType: string | undefined) {
		this.add(6, lineType);
	}

	textStyle(textStyle: string) {
		this.add(7, textStyle);
	}

	layerName(layerName: string) {
		this.add(8, layerName);
	}

	variableName(variableName: string) {
		this.add(9, variableName);
	}

	point2d(point: point2d_t, lastDigit = 0) {
		this.add(createGroupCode(1, lastDigit), point.x);
		this.add(createGroupCode(2, lastDigit), point.y);
	}

	point3d(point: point3d_t, lastDigit = 0) {
		this.point2d(point2d(point.x, point.y), lastDigit)
		this.add(createGroupCode(3, lastDigit), point.z);
	}

	elevation(elevation: number | undefined) {
		this.add(38, elevation);
	}

	thickness(thickness: number | undefined) {
		this.add(39, thickness);
	}

	visibilty(visibilty: boolean | undefined) {
		if (visibilty === undefined) return;
		this.add(60, visibilty ? 0 : 1);
	}

	colorNumber(colorNumber: number | undefined) {
		this.add(62, colorNumber);
	}

	subclassMarker(subclassMarker: string | undefined) {
		this.add(100, subclassMarker);
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
