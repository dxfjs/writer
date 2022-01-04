import DxfWriter from '../../src/DxfWriter';
import Handle from '../../src/Internals/Handle';

describe('Handle', () => {
	it('handle sould be 1 ', () => {
		const dxf = new DxfWriter();
		expect(Handle.handleSeed()).toBe('1B');
	});
});
