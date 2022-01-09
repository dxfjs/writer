import Point from '../../../../src/Sections/Entities/Entities/Point';

describe('Point', () => {
	const dataState = {
		instancesCount: 0,
	};
	it('should return the subClassName given.', () => {
		const entity = new Point(0, 0, 0, {});
		dataState.instancesCount++;
		expect(entity.subclassMarker).toBe('AcDbPoint');
	});

	it('should the given parameters.', () => {
		const entity = new Point(
			2444578787454548787878455454.33578787,
			4.54874541454545454,
			0.141111222155555555444,
			{}
		);
		dataState.instancesCount++;
		expect(entity.x).toBe(2444578787454548787878455454.33578787);
		expect(entity.y).toBe(4.54874541454545454);
		expect(entity.z).toBe(0.141111222155555555444);
	});

	it('should return the correct dxf string.', () => {
		const entity = new Point(
			24445787874545.336,
			47854548454.54874,
			0.14111122215556,
			{}
		);
		dataState.instancesCount++;
		const handle = dataState.instancesCount.toString(16).toUpperCase();
		let entityString = `  0\nPOINT\n  5\n${handle}\n  100\nAcDbEntity\n  8\n0\n  100\nAcDbPoint\n`;
		entityString +=
			'  10\n24445787874545.336\n  20\n47854548454.54874\n  30\n0.14111122215556\n';
		expect(entity.stringify()).toBe(entityString);
	});
});
