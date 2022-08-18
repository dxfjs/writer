import { describe, expect, it, beforeEach } from 'vitest';
import { Dxifier } from '../../../src/Internals/Dxifier';
import BoundingBox from '../../../src/Internals/BoundingBox';
import { boundingBox_t } from '../../../src/Internals/BoundingBox';
import Entity from '../../../src/Sections/EntitiesSection/Entity';

class DummyEntity extends Entity {
	public override boundingBox(): boundingBox_t {
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

	it('should return the correct dxf string.', () => {
		dataState.instancesCount++;
		const handle = dataState.instancesCount.toString(16).toUpperCase();
		entity.layerName = 'l_green';
		const dx = new Dxifier();
		entity.dxify(dx);
		expect(dx.stringify()).toBe(
			`0\nLINE\n5\n${handle}\n100\nAcDbEntity\n8\nl_green\n100\nAcDbLine`
		);
	});
});
