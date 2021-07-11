import Point    from "../../../../src/Sections/Entities/Entities/Point";
import Circle   from "../../../../src/Sections/Entities/Entities/Circle";

describe('Circle', () => {
    const dataState = {
        instancesCount: 0 // I increment this variable by 2 because we have 2 instantiations of Entity class (Arc and Point)
    }
    it('should return the subClassName given.', () => {
        const entity = new Circle(new Point(0, 0, 0), 120);
        dataState.instancesCount += 2;
        expect(entity.subclassMarker).toBe('AcDbCircle');
    });

    it('should return the center given.', () => {
        const entity = new Circle(new Point(10, 1250, 63.3), 120);
        dataState.instancesCount += 2;
        expect(entity.center.x).toBe(10);
        expect(entity.center.y).toBe(1250);
        expect(entity.center.z).toBe(63.3);
    });

    it('should return the correct dxf string.', () => {
        const entity = new Circle(new Point(10, 1250, 63.3), 120);
        dataState.instancesCount += 2;
        const handle = dataState.instancesCount.toString(16).toUpperCase();
        let entityString = `  0\nCIRCLE\n  5\n${handle}\n  100\nAcDbEntity\n  8\n0\n  100\nAcDbCircle\n`;
        entityString += `  10\n10\n  20\n1250\n  30\n63.3\n  40\n120\n`;
        expect(entity.stringify()).toBe(entityString);
    });
});
