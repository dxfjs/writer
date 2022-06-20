import { describe, expect, it } from 'vitest';
import { point2d } from '../../../../src/Internals/TagsManager';
import LWPolyline from '../../../../src/Sections/EntitiesSection/Entities/LWPolyline';

describe('Polyline', () => {
	const dataState = {
		instancesCount: 0,
	};
	it('should return the subClassName given.', () => {
		const entity = new LWPolyline(
			[{ point: point2d(0, 0) }, { point: point2d(120, 54) }],
			{}
		);
		dataState.instancesCount++;
		expect(entity.subclassMarker).toBe('AcDbPolyline');
	});

	it('should return the given parameters.', () => {
		const entity = new LWPolyline(
			[{ point: point2d(0, 0) }, { point: point2d(120, 54) }],
			{}
		);
		dataState.instancesCount++;
		expect(entity.vertices).toEqual([
			{ point: point2d(0, 0) },
			{ point: point2d(120, 54) },
		]);
	});

	it('should return the correct dxf string.', function () {
		const entity = new LWPolyline(
			[{ point: point2d(0, 0) }, { point: point2d(120, 54) }],
			{}
		);
		dataState.instancesCount++;
		const handle = dataState.instancesCount.toString(16).toUpperCase();
		let entityString = `  0\nLWPOLYLINE\n  5\n${handle}\n  100\nAcDbEntity\n  8\n0\n  100\nAcDbPolyline\n`;
		entityString +=
			'  90\n2\n  70\n0\n  43\n0\n  38\n0\n  39\n0\n  10\n0\n  20\n0\n  10\n120\n  20\n54\n';
		expect(entity.stringify()).toBe(entityString);
	});
});
