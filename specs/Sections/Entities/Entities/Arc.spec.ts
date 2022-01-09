import { point3d } from '../../../../src/Internals/TagsManager';
import Arc from '../../../../src/Sections/Entities/Entities/Arc';

describe('Arc', () => {
	const dataState = {
		instancesCount: 0,
	};

	let entity;

	beforeEach(() => {
		entity = new Arc(point3d(10, 1250, 63.3), 120, 0, 120, {});
		dataState.instancesCount++;
	});
	it('should return the subClassName given.', () => {
		entity = new Arc(point3d(0, 0, 0), 120, 0, 120, {});
		dataState.instancesCount++;
		expect(entity.subclassMarker).toBe('AcDbCircle');
	});

	it('should return the center given.', () => {
		expect(entity.center.x).toBe(10);
		expect(entity.center.y).toBe(1250);
		expect(entity.center.z).toBe(63.3);
	});

	it('should return the start and end angle given.', () => {
		expect(entity.startAngle).toBe(0);
		expect(entity.endAngle).toBe(120);
	});

	it('should return the radius given.', () => {
		expect(entity.radius).toBe(120);
	});

	it('should return the correct dxf string.', () => {
		const handle = dataState.instancesCount.toString(16).toUpperCase();
		let entityString = `  0\nARC\n  5\n${handle}\n  100\nAcDbEntity\n  8\n0\n  100\nAcDbCircle\n`;
		entityString += `  10\n10\n  20\n1250\n  30\n63.3\n  40\n120\n  100\nAcDbArc\n  50\n0\n  51\n120\n`;
		expect(entity.stringify()).toBe(entityString);
	});
});
