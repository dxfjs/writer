import DXFManager from "../../src/Internals/DXFManager";

describe('DXFManager', function() {
    const dataState = {
        instancesCount: 0,
    }
    describe('handle', function() {
        it('should return 1 when it\'s called on the first instance of DXFManager.', function() {
            const dxfManager = new DXFManager();
            dataState.instancesCount++;
            expect(dxfManager.handle).toBe('1');
        });
        it('should return A when it\'s called on the 10th instance of DXFManager.', function() {
            for (let i = 0; i < 8; i++) {
                dataState.instancesCount++;
                new DXFManager();
            }
            const dxfManager = new DXFManager();
            dataState.instancesCount++;
            expect(dxfManager.handle).toBe('A');
        });
        it('instancesCount should be 10', function() {
            expect(dataState.instancesCount).toBe(10);
        });
        it('should return 3E8 when it\'s called on the 1000th instance of DXFManager.', function() {
            for (let i = 1; i < 990; i++) {
                dataState.instancesCount++;
                new DXFManager();
            }
            const dxfManager = new DXFManager();
            dataState.instancesCount++;
            expect(dxfManager.handle).toBe('3E8');
        });
        it('instancesCount should be 1000', function() {
            expect(dataState.instancesCount).toBe(1000);
        });
    });
});
