import DxfManager from '../src/DxfManager';

jest.mock('../src/DxfManager');

describe('DxfManager class', () => {
	it('Should call DxfManager constructor for each instance', () => {
		new DxfManager()
		new DxfManager()
		expect(DxfManager).toHaveBeenCalledTimes(2);
	});
});
