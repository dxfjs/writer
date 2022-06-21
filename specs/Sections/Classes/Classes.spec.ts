import { describe, expect, it } from 'vitest';
import DxfClassesSection from '../../../src/Sections/ClassesSection/DxfClassesSection';

describe('Classes', () => {
	describe('stringify', () => {
		it('should return an empty CLASSES section.', () => {
			const classes = new DxfClassesSection();
			expect(classes.stringify()).toBe(
				'  0\nSECTION\n  2\nCLASSES\n  0\nENDSEC\n'
			);
		});
	});
});
