import DxfClasses from '../../../src/Sections/Classes/DxfClasses';

describe('Classes', () => {
	describe('stringify', () => {
		it('should return an empty CLASSES section.', () => {
			const classes = new DxfClasses();
			expect(classes.stringify()).toBe(
				'  0\nSECTION\n  2\nCLASSES\n  0\nENDSEC\n'
			);
		});
	});
});
