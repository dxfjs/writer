import BoundingBox from '../../../src/Internals/BoundingBox';
import GlobalState from '../../../src/GlobalState';
import { boundingBox_t } from '../../../src/Internals/BoundingBox';
import Entity from '../../../src/Sections/Entities/Entity';

class DummyEntity extends Entity {
	public boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox({ x: 0, y: 0, z: 0 });
	}
}

describe('Entity', () => {
	const dataState = {
		instancesCount: 0,
	};

	let entity: DummyEntity;

	beforeEach(() => {
		entity = new DummyEntity('LINE', 'AcDbLine');
	});

	it('should return the subClassName given.', () => {
		dataState.instancesCount++;
		expect(entity.subclassMarker).toBe('AcDbLine');
	});
	it('should return the entity Type given.', () => {
		dataState.instancesCount++;
		expect(entity.type).toBe('LINE');
	});
	it('should return the current layer.', () => {
		dataState.instancesCount++;
		expect(entity.layerName).toBe(GlobalState.currentLayerName);
	});

	it('should return the previous layer.', () => {
		dataState.instancesCount++;
		GlobalState.currentLayerName = 'l_green';
		expect(entity.layerName).toBe('0');
	});

	it('should return the correct dxf string.', () => {
		dataState.instancesCount++;
		const handle = dataState.instancesCount.toString(16).toUpperCase();
		expect(entity.stringify()).toBe(
			`  0\nLINE\n  5\n${handle}\n  100\nAcDbEntity\n  8\nl_green\n  100\nAcDbLine\n`
		);
	});
});
