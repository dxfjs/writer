import TagsManager from '../../../src/Internals/TagsManager';
import DxfVariable from '../../../src/Sections/Header/DxfVariable';

describe('DxfHeader class', () => {
	const header = new DxfVariable('$ACADVER', { 1: 'AC1021' });

	it('Defines stringify()', () => {
		expect(typeof header.stringify).toBe('function');
	});

	it('Has property manager', () => {
		expect(header.manager).toBeInstanceOf(TagsManager);
	});

	it('Should have correct name and values', () => {
		expect(header.name).toBe('$ACADVER');
		expect(header.values).toEqual({ 1: 'AC1021' });
	});

	it('Should return correct dxf string', () => {
		expect(header.stringify()).toBe('  9\n$ACADVER\n  1\nAC1021\n');
	});
});
