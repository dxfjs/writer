import { describe, expect, it } from 'vitest';
import { point3d } from 'Internals/Helpers';
import { Dxifier } from 'Internals/Dxifier';
import Line from 'EntitiesSection/Entities/Line';

describe('Line', () => {
	const dataState = {
		instancesCount: 0,
	};

	it('should return the given points.', () => {
		const entity = new Line(point3d(0, 0, 0.22), point3d(125, 85.23, 0.336), {});
		dataState.instancesCount++;
		expect(entity.startPoint.x).toBe(0);
		expect(entity.startPoint.y).toBe(0);
		expect(entity.startPoint.z).toBe(0.22);

		expect(entity.endPoint.x).toBe(125);
		expect(entity.endPoint.y).toBe(85.23);
		expect(entity.endPoint.z).toBe(0.336);
	});

	it('should return the correct dxf string.', () => {
		const entity = new Line(point3d(1.32, 1, 0.22), point3d(135, 855.23, 0.336), {});
		dataState.instancesCount++;
		const handle = dataState.instancesCount.toString(16).toUpperCase();
		let entityString = `0\nLINE\n5\n${handle}\n100\nAcDbEntity\n8\n0\n100\nAcDbLine\n`;
		entityString += `10\n1.32\n20\n1\n30\n0.22\n11\n135\n21\n855.23\n31\n0.336`;
		const dx = new Dxifier();
		entity.dxify(dx);
		expect(dx.stringify()).toBe(entityString);
	});
});
