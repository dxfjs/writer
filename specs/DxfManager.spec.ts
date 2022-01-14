import DxfManager from '../src/DxfManager';

jest.mock('../src/DxfManager');

describe('DxfManager class', () => {
	const d = DxfManager.getInstance();

	it('Should call DxfManager constructor zero time', () => {
		expect(DxfManager).toHaveBeenCalledTimes(0);
	});
});
