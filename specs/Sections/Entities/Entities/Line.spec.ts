import Line     from "../../../../src/Sections/Entities/Entities/Line";
import Point    from "../../../../src/Sections/Entities/Entities/Point";

describe('Line', () => {
    const dataState = {
        instancesCount: 0
    }
    it('should return the subClassName given.', () => {
        const entity = new Line(new Point(0, 0, 0), new Point(0, 0, 0));
        dataState.instancesCount += 3;
        expect(entity.subclassMarker).toBe('AcDbLine');
    });

    it('should return the given points.', () => {
        const entity = new Line(new Point(0, 0, 0.22), new Point(125, 85.23, 0.336));
        dataState.instancesCount += 3;
        expect(entity.start.x).toBe(0);
        expect(entity.start.y).toBe(0);
        expect(entity.start.z).toBe(0.22);

        expect(entity.end.x).toBe(125);
        expect(entity.end.y).toBe(85.23);
        expect(entity.end.z).toBe(0.336);
    });

    it('should return the correct dxf string.', () => {
        const entity = new Line(new Point(1.32, 1, 0.22), new Point(135, 855.23, 0.336));
        dataState.instancesCount += 3;
        const handle = dataState.instancesCount.toString(16).toUpperCase();
        let entityString = `  0\nLINE\n  5\n${handle}\n  100\nAcDbEntity\n  8\n0\n  100\nAcDbLine\n`;
        entityString += `  10\n1.32\n  20\n1\n  30\n0.22\n  11\n135\n  21\n855.23\n  31\n0.336\n`;
        expect(entity.stringify()).toBe(entityString);
    });
});
