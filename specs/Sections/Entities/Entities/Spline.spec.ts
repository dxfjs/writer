import { describe, expect, it } from 'vitest';
import { point3d } from '../../../../src/Internals/TagsManager';
import Spline from '../../../../src/Sections/EntitiesSection/Entities/Spline';

describe('Spline', () => {
	const dataState = {
		instancesCount: 0,
	};
	it('should return the subClassName given.', () => {
		let points = [
			point3d(0, 0, 0),
			point3d(0, 10, 0),
			point3d(15, 15, 0),
			point3d(30, 10, 0),
			point3d(30, 0, 0),
		];
		const entity = new Spline({ controlPoints: points }, {});
		dataState.instancesCount++;
		expect(entity.subclassMarker).toBe('AcDbSpline');
	});
});
