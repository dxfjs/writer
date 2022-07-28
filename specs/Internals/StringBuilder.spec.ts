import { describe, expect, it } from 'vitest';
import { StringBuilder } from '../../src/Internals/StringBuilder';

describe('StrinBuilder class', () => {
	it('should starts with an empty array tags', () => {
		const sb = new StringBuilder();
		expect(sb.tags).toEqual([]);
	});

	it('should push tow elements to the array tags', () => {
		const sb = new StringBuilder();
		sb.push(0, 'SECTION');
		expect(sb.tags).toEqual([0, 'SECTION']);
	});

	it('should return the dxf string', () => {
		const sb = new StringBuilder();
		sb.push(0, 'SECTION');
		sb.push(2, 'CLASSES');
		sb.push(0, 'ENDSEC');
		expect(sb.stringify()).toBe('0\nSECTION\n2\nCLASSES\n0\nENDSEC');
	});
});
