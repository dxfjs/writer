import { describe, expect, it } from 'vitest';
import { Dxifier } from 'Internals/Dxifier';
import DxfVariable from 'HeaderSection/DxfVariable';

describe('DxfHeader class', () => {
	const header = new DxfVariable('$ACADVER', { 1: 'AC1021' });

	it('Defines dxify()', () => {
		expect(typeof header.dxify).toBe('function');
	});

	it('Should have correct name and values', () => {
		expect(header.name).toBe('$ACADVER');
		expect(header.values).toEqual({ 1: 'AC1021' });
	});

	it('Should return correct dxf string', () => {
		const dx = new Dxifier();
		header.dxify(dx);
		expect(dx.stringify()).toBe('9\n$ACADVER\n1\nAC1021');
	});
});
