import Point from "../../../../src/Sections/Entities/Entities/Point";
import Spline from "../../../../src/Sections/Entities/Entities/Spline";

describe('Spline', () => {
    const dataState = {
        instancesCount: 0
    }
    it('should return the subClassName given.', () => {
        let points = [
            [0, 0, 0],
            [0, 10, 0],
            [15, 15, 0],
            [30, 10, 0],
            [30, 0, 0]
        ];
        const entity = new Spline(points, 3, 0, [0, 0, 0, 0, 0.5, 2, 2, 2, 2], [], []);
        dataState.instancesCount++;
        expect(entity.subClassName).toBe('AcDbSpline');
    });
});
