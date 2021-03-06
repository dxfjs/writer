import { expect } from 'chai';
import DXFProcessor from "../src/Prototype/DXFProcessor";
import Tag from "../src/Prototype/Tag";

describe('DXFProcessor', function() {
    const dataState = {
        instancesCount: 0,
    }
    describe('handle', function() {
        it('should return 1 when it\'s called on the first instance of DXFProcessor.', function() {
            const dxfProcessor = new DXFProcessor();
            dataState.instancesCount++;
            expect(dxfProcessor.handle).equal('1');
        });
        it('should return A when it\'s called on the 10th instance of DXFProcessor.', function() {
            for (let i = 0; i < 8; i++) {
                dataState.instancesCount++;
                new DXFProcessor();
            }
            const dxfProcessor = new DXFProcessor();
            dataState.instancesCount++;
            expect(dxfProcessor.handle).equal('A');
        });
        it('instancesCount should be 10', function() {
            expect(dataState.instancesCount).equal(10);
        });
        it('should return 3E8 when it\'s called on the 1000th instance of DXFProcessor.', function() {
            for (let i = 1; i < 990; i++) {
                dataState.instancesCount++;
                new DXFProcessor();
            }
            const dxfProcessor = new DXFProcessor();
            dataState.instancesCount++;
            expect(dxfProcessor.handle).equal('3E8');
        });
        it('instancesCount should be 1000', function() {
            expect(dataState.instancesCount).equal(1000);
        });
    });

    describe('version', function () {
        it('should return AC1021 as default value.', function () {
            const dxfProcessor = new DXFProcessor();
            expect(dxfProcessor.version).equal('AC1021');
        });

        it('should return AC1009.', function () {
            const dxfProcessor = new DXFProcessor();
            dxfProcessor.version = DXFProcessor.versions.R12;
            expect(dxfProcessor.version).equal('AC1009');
        });

        it('should return AC1032.', function () {
            const dxfProcessor = new DXFProcessor();
            dxfProcessor.version = DXFProcessor.versions.R2018;
            expect(dxfProcessor.version).equal('AC1032');
        });
        it('should return AC1032.', function () {
            const dxfProcessor = new DXFProcessor();
            expect(dxfProcessor.version).equal('AC1032');
        });
    });

    describe('isTagSupported', function () {
        it('should return true.', function () {
            const tag = new Tag(0, 'SECTION');
            const dxfProcessor = new DXFProcessor();
            expect(dxfProcessor.isTagSupported(tag)).equal(true);
        });
        it('should return false.', function () {
            const dxfProcessor = new DXFProcessor();
            dxfProcessor.version = DXFProcessor.versions.R12
            const tag = new Tag(5, dxfProcessor.handle, DXFProcessor.versions.R13);
            expect(dxfProcessor.isTagSupported(tag)).equal(false);
        });

        it('should return true.', function () {
            const dxfProcessor = new DXFProcessor();
            dxfProcessor.version = DXFProcessor.versions.R2018
            const tag = new Tag(5, dxfProcessor.handle, DXFProcessor.versions.R13);
            expect(dxfProcessor.isTagSupported(tag)).equal(true);
        });

        it('should return true.', function () {
            const dxfProcessor = new DXFProcessor();
            dxfProcessor.version = DXFProcessor.versions.R2013
            const tag = new Tag(5, dxfProcessor.handle, DXFProcessor.versions.R13);
            expect(dxfProcessor.isTagSupported(tag)).equal(true);
        });
    });
});