import DXFManager from '../../src/Internals/DXFManager';

describe('DXFManager', () => {
    const dataState = {
        instancesCount: 0,
    };
    describe('handle', () => {
        it("should return 1 when it's called on the first instance of DXFManager.", () => {
            const dxfManager = new DXFManager();
            dataState.instancesCount++;
            expect(dxfManager.handle).toBe('1');
        });

        it("should return A when it's called on the 10th instance of DXFManager.", () => {
            for (let i = 0; i < 8; i++) {
                dataState.instancesCount++;
                new DXFManager();
            }
            const dxfManager = new DXFManager();
            dataState.instancesCount++;
            expect(dxfManager.handle).toBe('A');
        });

        it('instancesCount should be 10', () => {
            expect(dataState.instancesCount).toBe(10);
        });

        it("should return 3E8 when it's called on the 1000th instance of DXFManager.", () => {
            for (let i = 1; i < 990; i++) {
                dataState.instancesCount++;
                new DXFManager();
            }
            const dxfManager = new DXFManager();
            dataState.instancesCount++;
            expect(dxfManager.handle).toBe('3E8');
        });

        it('instancesCount should be 1000.', () => {
            expect(dataState.instancesCount).toBe(1000);
        });
    });

    describe('setTrueColorRGB', () => {
        it('should set the right value of the RGB true color.', () => {
            DXFManager.setTrueColorRGB(200, 100, 50);
            expect(DXFManager.currentTrueColor).toEqual(13132850);
        });
    });

    describe('unsetTrueColor', () => {
        it('should set the currentTrueColor to NaN.', () => {
            DXFManager.unsetTrueColor();
            expect(DXFManager.currentTrueColor).toEqual(NaN);
        });
    });

    describe('setTrueColorHex', () => {
        it('should set the right value of the Hex true color (Without #).', () => {
            DXFManager.setTrueColorHex('C86432');
            expect(DXFManager.currentTrueColor).toEqual(13132850);
        });

        it('should set the right value of the Hex true color (With #).', () => {
            DXFManager.unsetTrueColor();
            DXFManager.setTrueColorHex('#C86432');
            expect(DXFManager.currentTrueColor).toEqual(13132850);
        });
    });
});
