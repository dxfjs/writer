import DxfClassesSection from '../../../src/Sections/ClassesSection/DxfClassesSection';

describe('Classes', () => {
	describe('stringify', () => {
		it('should return an empty CLASSES section.', () => {
			const classes = DxfClassesSection.getInstance();
			expect(classes.stringify()).toBe(
				'  0\nSECTION\n  2\nCLASSES\n  0\nENDSEC\n'
			);
		});

		it('should return the same instance.', () => {
			const instance1 = DxfClassesSection.getInstance();
			const instance2 = DxfClassesSection.getInstance();
			expect(instance1).toEqual(instance2);
		});
	});
});
