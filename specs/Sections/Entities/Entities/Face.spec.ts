import Face     from "../../../../src/Sections/Entities/Entities/Face";
import Point    from "../../../../src/Sections/Entities/Entities/Point";

describe('Face', () => {
    const dataState = {
        instancesCount: 0
    }
    it('should return the subClassName given.', () => {
        const entity = new Face(
            new Point(0, 0, 0),
            new Point(0, 0, 0),
            new Point(0, 0, 0),
            new Point(0, 0, 0)
        );
        dataState.instancesCount += 5;
        expect(entity.subClassName).toBe('AcDbFace');
    });

    it('should return the point given.', () => {
        const entity = new Face(
            new Point(0, 0, 50),
            new Point(3, 0, 0),
            new Point(0, 2, 0),
            new Point(90, 0, 0)
        );
        dataState.instancesCount += 5;
        expect(entity.first.x).toBe(0);
        expect(entity.first.y).toBe(0);
        expect(entity.first.z).toBe(50);

        expect(entity.second.x).toBe(3);
        expect(entity.second.y).toBe(0);
        expect(entity.second.z).toBe(0);

        expect(entity.third.x).toBe(0);
        expect(entity.third.y).toBe(2);
        expect(entity.third.z).toBe(0);

        expect(entity.fourth.x).toBe(90);
        expect(entity.fourth.y).toBe(0);
        expect(entity.fourth.z).toBe(0);
    });

    it('should return the correct dxf string.', () => {
        const entity = new Face(
            new Point(0, 0, 50),
            new Point(3, 0, 0),
            new Point(0, 2, 0),
            new Point(90, 0, 0)
        );
        dataState.instancesCount += 5;
        const handle = dataState.instancesCount.toString(16).toUpperCase();
        let entityString = `  0\n3DFACE\n  5\n${handle}\n  100\nAcDbEntity\n  8\n0\n  100\nAcDbFace\n`;
        entityString += `  10\n0\n  20\n0\n  30\n50\n  11\n3\n  21\n0\n  31\n0\n`;
        entityString += `  12\n0\n  22\n2\n  32\n0\n  13\n90\n  23\n0\n  33\n0\n`;
        expect(entity.stringify()).toBe(entityString);
    });
});
