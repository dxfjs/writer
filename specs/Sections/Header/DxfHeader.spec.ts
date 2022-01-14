import DxfHeaderSection from '../../../src/Sections/HeaderSection/DxfHeaderSection';

describe('DxfHeader class', () => {
	const header = DxfHeaderSection.getInstance();

	it('Should have zero variable', () => {
		expect(header.variables.length).toBe(0);
	});

	it('Defines setVariable()', () => {
		expect(typeof header.setVariable).toBe('function');
	});

	it('The length of setVariable() is 2', () => {
		expect(header.setVariable.length).toBe(2);
	});

	it('Should add a new variable with correct informations', () => {
		header.setVariable('$ACADVER', { 1: 'AC1021' });
		expect(header.variables.length).toBe(1);
		const [variable] = header.variables;
		expect(variable.name).toBe('$ACADVER');
		expect(variable.values).toEqual({ 1: 'AC1021' });
	});

	it('Should update the existing variable with correct informations', () => {
		header.setVariable('$ACADVER', { 1: 'AC1027' });
		expect(header.variables.length).toBe(1);
		const [variable] = header.variables;
		expect(variable.name).toBe('$ACADVER');
		expect(variable.values).toEqual({ 1: 'AC1027' });
	});

	it('Should add another variable with correct informations', () => {
		header.setVariable('$EXTMAX', { 10: 0, 20: 0, 30: 1 });
		expect(header.variables.length).toBe(2);
		const [_, variable] = header.variables;
		expect(variable.name).toBe('$EXTMAX');
		expect(variable.values).toEqual({ 10: 0, 20: 0, 30: 1 });
	});

	it('Should update the second existing variable with correct informations', () => {
		header.setVariable('$EXTMAX', { 10: 10, 20: 20, 30: 31 });
		expect(header.variables.length).toBe(2);
		const [_, variable] = header.variables;
		expect(variable.name).toBe('$EXTMAX');
		expect(variable.values).toEqual({ 10: 10, 20: 20, 30: 31 });
	});

	it('Should return the correct dxf string', () => {
		const dxfStr = header.stringify();
		const expected =
			'  0\nSECTION\n  2\nHEADER\n  9\n$ACADVER\n  1\nAC1027\n  9\n$EXTMAX\n  10\n10\n  20\n20\n  30\n31\n  0\nENDSEC\n';
		expect(dxfStr).toBe(expected);
	});
});
