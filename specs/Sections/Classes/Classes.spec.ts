import { describe, expect, it } from 'vitest';
import { Dxifier } from '../../../src';
import DxfClassesSection from '../../../src/Sections/ClassesSection/DxfClassesSection';

describe('Classes', () => {
	describe('stringify', () => {
		it('should return an empty CLASSES section.', () => {
			const classes = new DxfClassesSection();
			const mg = new Dxifier();
			classes.dxify(mg);
			expect(mg.stringify()).toBe('0\nSECTION\n2\nCLASSES\n0\nENDSEC');
		});
	});
});
