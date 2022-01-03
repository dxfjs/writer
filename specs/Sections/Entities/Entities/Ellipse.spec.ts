import Point from '../../../../src/Sections/Entities/Entities/Point';
import Ellipse from '../../../../src/Sections/Entities/Entities/Ellipse';

describe('Ellipse', () => {
	const dataState = {
		instancesCount: 0,
	};
	it('should return the subClassName given.', () => {
		const entity = new Ellipse(
			new Point(0, 0, 0),
			100,
			50,
			0.4243,
			0,
			2 * Math.PI
		);
		dataState.instancesCount += 2;
		expect(entity.subclassMarker).toBe('AcDbEllipse');
	});

	it('should return the center given.', () => {
		const entity = new Ellipse(
			new Point(10, 1250, 63.3),
			100,
			50,
			0.4243,
			0,
			2 * Math.PI
		);
		dataState.instancesCount += 2;
		expect(entity.center.x).toBe(10);
		expect(entity.center.y).toBe(1250);
		expect(entity.center.z).toBe(63.3);
	});

	it('should return the given parameters', () => {
		const entity = new Ellipse(
			new Point(10, 1250, 63.3),
			100,
			50,
			0.4243,
			0,
			2 * Math.PI
		);
		dataState.instancesCount += 2;
		expect(entity.xMajorAxis).toBe(100);
		expect(entity.yMajorAxis).toBe(50);
		expect(entity.ratioMinorAxis).toBe(0.4243);
		expect(entity.startParameter).toBe(0);
		expect(entity.endParameter).toBe(2 * Math.PI);
	});

	it('should return the correct dxf string.', () => {
		const entity = new Ellipse(
			new Point(10, 1250, 63.3),
			100,
			50,
			0.4243,
			0,
			2 * Math.PI
		);
		dataState.instancesCount += 2;
		const handle = dataState.instancesCount.toString(16).toUpperCase();
		let entityString = `  0\nELLIPSE\n  5\n${handle}\n  100\nAcDbEntity\n  8\n0\n  100\nAcDbEllipse\n`;
		entityString += `  10\n10\n  20\n1250\n  30\n63.3\n  11\n100\n  21\n50\n  31\n0\n  40\n0.4243\n  41\n0\n  42\n6.283185307179586\n`;
		expect(entity.stringify()).toBe(entityString);
	});
});
