import DXFWriter from '../../src/DXFWriter';
import Handle from '../../src/Internals/Handle';

describe('Handle', () => {
	it('handle sould be 1 ', () => {
		const dxf = new DXFWriter();
		expect(Handle.handleSeed()).toBe('1B');
	});
});
