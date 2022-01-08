import { point3d } from '../../../../src/Internals/TagsManager';
import Face from '../../../../src/Sections/Entities/Entities/Face';

describe('Face', () => {
	const dataState = {
		instancesCount: 0,
	};
	it('should return the subClassName given.', () => {
		const entity = new Face(
			point3d(0, 0, 0),
			point3d(0, 0, 0),
			point3d(0, 0, 0),
			point3d(0, 0, 0),
			{}
		);
		dataState.instancesCount++;
		expect(entity.subclassMarker).toBe('AcDbFace');
	});

	it('should return the point given.', () => {
		const entity = new Face(
			point3d(0, 0, 50),
			point3d(3, 0, 0),
			point3d(0, 2, 0),
			point3d(90, 0, 0),
			{}
		);
		dataState.instancesCount++;
		expect(entity.firstCorner.x).toBe(0);
		expect(entity.firstCorner.y).toBe(0);
		expect(entity.firstCorner.z).toBe(50);

		expect(entity.secondCorner.x).toBe(3);
		expect(entity.secondCorner.y).toBe(0);
		expect(entity.secondCorner.z).toBe(0);

		expect(entity.thirdCorner.x).toBe(0);
		expect(entity.thirdCorner.y).toBe(2);
		expect(entity.thirdCorner.z).toBe(0);

		expect(entity.fourthCorner.x).toBe(90);
		expect(entity.fourthCorner.y).toBe(0);
		expect(entity.fourthCorner.z).toBe(0);
	});

	it('should return the correct dxf string.', () => {
		const entity = new Face(
			point3d(0, 0, 50),
			point3d(3, 0, 0),
			point3d(0, 2, 0),
			point3d(90, 0, 0),
			{}
		);
		dataState.instancesCount++;
		const handle = dataState.instancesCount.toString(16).toUpperCase();
		let entityString = `  0\n3DFACE\n  5\n${handle}\n  100\nAcDbEntity\n  8\n0\n  6\nByLayer\n  62\n256\n  48\n1\n  60\n0\n  100\nAcDbFace\n`;
		entityString += `  10\n0\n  20\n0\n  30\n50\n  11\n3\n  21\n0\n  31\n0\n`;
		entityString += `  12\n0\n  22\n2\n  32\n0\n  13\n90\n  23\n0\n  33\n0\n`;
		expect(entity.stringify()).toBe(entityString);
	});
});
