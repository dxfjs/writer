import Point from "../../../../src/Sections/Entities/Entities/Point";
import Spline from "../../../../src/Sections/Entities/Entities/Spline";

describe('Spline', () => {
    const dataState = {
        instancesCount: 0
    }
    it('should return the subClassName given.', () => {
        const entity = new Spline([[1904.63, 1452.05, 0], [2000.04, 1569.16, 0], [2262.14, 1890.86, 0]], 3, 0, [0, 0, 0, 0, 0.5, 2, 2, 2, 2], [], []);
        dataState.instancesCount++;
        expect(entity.subClassName).toBe('AcDbSpline');
    });
});
