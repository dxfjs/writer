import DXFManager   from "../../../src/Internals/DXFManager";
import Entity       from "../../../src/Sections/Entities/Entity";

describe('Entity', () => {
    const dataState = {
        instancesCount: 0
    }
    it('should return the subClassName given.', () => {
        const entity = new Entity('LINE', 'AcDbLine');
        dataState.instancesCount++;
        expect(entity.subclassMarker).toBe('AcDbLine');
    });
    it('should return the entity Type given.', () => {
        const entity = new Entity('LINE', 'AcDbLine');
        dataState.instancesCount++;
        expect(entity.type).toBe('LINE');
    });
    it('should return the current layer.', () => {
        const entity = new Entity('LINE', 'AcDbLine');
        dataState.instancesCount++;
        expect(entity.layerName).toBe(DXFManager.currentLayer);
    });

    it('should return the previous layer.', () => {
        const entity = new Entity('LINE', 'AcDbLine');
        dataState.instancesCount++;
        DXFManager.currentLayer = 'l_green';
        expect(entity.layerName).toBe('0');
    });

    it('should return the correct dxf string.', () => {
        const entity = new Entity('LINE', 'AcDbLine');
        dataState.instancesCount++;
        const handle = dataState.instancesCount.toString(16).toUpperCase();
        expect(entity.stringify()).toBe(`  0\nLINE\n  5\n${handle}\n  100\nAcDbEntity\n  8\nl_green\n  100\nAcDbLine\n`);
    });
});
