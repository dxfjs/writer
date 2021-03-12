import DXFManager   from "../../../../src/Internals/DXFManager";
import Polyline     from "../../../../src/Sections/Entities/Entities/Polyline";



describe('Polyline', () => {
    DXFManager.handleSeed = 0;
    const dataState = {
        instancesCount: 0
    }
    it('should return the subClassName given.', () => {
        const entity = new Polyline([[0,0], [120, 54]], 0);
        dataState.instancesCount += 3;
        expect(entity.subClassName).toBe('AcDbPolyline');
    });

    it('should return the given parameters.', () => {
        const entity = new Polyline([[0,0], [120, 54], [400, 520]], 0);
        dataState.instancesCount += 4;
        expect(entity.flag).toBe(0);
        expect(entity.points).toEqual([[0,0], [120, 54], [400, 520]]);
    });

    it('should return the correct dxf string.', () => {
        const entity = new Polyline([[0,0], [120, 54], [400, 520]], 0);
        dataState.instancesCount += 4;
        const handle = dataState.instancesCount.toString(16).toUpperCase();
        let entityString = `  0\nLWPOLYLINE\n  5\n${handle}\n  100\nAcDbEntity\n  8\n0\n  100\nAcDbPolyline\n`;
        entityString += '  90\n3\n  70\n0\n  10\n0\n  20\n0\n  10\n120\n  20\n54\n  10\n400\n  20\n520\n';
        expect(entity.stringify()).toBe(entityString);
    });
});
