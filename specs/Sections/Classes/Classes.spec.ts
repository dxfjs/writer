import { describe, expect, it } from 'vitest';
import { Dxifier } from '../../../src/Internals/Dxifier';
import DxfClassesSection from '../../../src/Sections/ClassesSection/DxfClassesSection';

describe('Classes', () => {
	describe('stringify', () => {
		it('should return an empty CLASSES section.', () => {
			const classes = new DxfClassesSection();
			const dx = new Dxifier();
			classes.dxify(dx);
			expect(dx.stringify()).toBe('0\nSECTION\n2\nCLASSES\n0\nENDSEC');
		});
	});
});
