import { describe, expect, it } from 'vitest';
import { point3d } from '../../../../src/Internals/Utils';
import Polyline from '../../../../src/Sections/EntitiesSection/Entities/Polyline';

describe('Polyline3D', () => {
	const dataState = {
		instancesCount: 0,
	};
	it('should return the subClassName given.', () => {
		const entity = new Polyline([point3d(0, 0, 0), point3d(120, 54, 45)]);
		dataState.instancesCount++;
		expect(entity.subclassMarker).toBe('AcDb3dPolyline');
	});

	it('should return the given parameters.', () => {
		const entity = new Polyline([
			point3d(121.326, 0.4152, 8787),
			point3d(120, 5544, 45),
		]);
		dataState.instancesCount++;
		expect(entity.flags).toBe(0);
		expect(entity.vertices).toEqual([
			point3d(121.326, 0.4152, 8787),
			point3d(120, 5544, 45),
		]);
	});

	/*it('should return the correct dxf string.', function () {
		const entity = new Polyline3D([[0, 0, 0], [1, 1, 1]], 0);
		dataState.instancesCount++;
		const handle = dataState.instancesCount.toString(16).toUpperCase();
		let entityString = `  0\nLWPOLYLINE\n  5\n${handle}\n  100\nAcDbEntity\n  8\n0\n  100\nAcDbPolyline\n`;
		entityString += '  90\n2\n  70\n0\n  10\n0\n  20\n0\n  10\n120\n  20\n54\n';
		const dx =  new DxfManager();
		entity.dxify(dx)
		expect(dx.stringify()).toBe(entityString);
	});*/
});
