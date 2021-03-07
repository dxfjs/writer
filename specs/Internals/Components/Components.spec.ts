import NameComponent            from "../../../src/Internals/Components/NameComponent";
import ColorComponent           from "../../../src/Internals/Components/ColorComponent";
import PointComponent           from "../../../src/Internals/Components/PointComponent";
import LayerComponent           from "../../../src/Internals/Components/LayerComponent";
import HandleComponent          from "../../../src/Internals/Components/HandleComponent";
import StandardComponent        from "../../../src/Internals/Components/StandardComponent";
import LineTypeComponent        from "../../../src/Internals/Components/LineTypeComponent";
import TextStyleComponent       from "../../../src/Internals/Components/TextStyleComponent";
import TrueColorComponent       from "../../../src/Internals/Components/TrueColorComponent";
import ThicknessComponent       from "../../../src/Internals/Components/ThicknessComponent";
import EntityTypeComponent      from "../../../src/Internals/Components/EntityTypeComponent";
import SubclassMarkerComponent  from "../../../src/Internals/Components/SubclassMarkerComponent";

describe('ColorComponent', () => {
    describe('stringify', () => {
        it('should return the correct dxf string', () => {
            const colorComponent = new ColorComponent(7);
            expect(colorComponent.stringify()).toBe('  62\n8\n');
        });
    });
});

describe('EntityTypeComponent', () => {
    describe('stringify', () => {
        it('should return the correct dxf string', () => {
            const entityTypeComponent = new EntityTypeComponent('SECTION');
            expect(entityTypeComponent.stringify()).toBe('  0\nSECTION\n');
        });
    });
});

describe('HandleComponent', () => {
    describe('stringify', () => {
        it('should return the correct dxf string', () => {
            const handleComponent = new HandleComponent('3E8');
            expect(handleComponent.stringify()).toBe('  5\n3E8\n');
        });
    });
});

describe('LayerComponent', () => {
    describe('stringify', () => {
        it('should return the correct dxf string', () => {
            const layerComponent = new LayerComponent('l_green');
            expect(layerComponent.stringify()).toBe('  8\nl_green\n');
        });
    });
});

describe('LineTypeComponent', () => {
    describe('stringify', () => {
        it('should return the correct dxf string', () => {
            const lineTypeComponent = new LineTypeComponent('CONTINUOUS');
            expect(lineTypeComponent.stringify()).toBe('  6\nCONTINUOUS\n');
        });
    });
});

describe('NameComponent', () => {
    describe('stringify', () => {
        it('should return the correct dxf string', () => {
            let nameComponent = new NameComponent('BLOCKS');
            expect(nameComponent.stringify()).toBe('  2\nBLOCKS\n');
            nameComponent = new NameComponent('txt', 3);
            expect(nameComponent.stringify()).toBe('  3\ntxt\n');
        });
    });
});

describe('PointComponent', () => {
    describe('stringify', () => {
        it('should return the correct dxf string', () => {
            let pointComponent = new PointComponent(90,90);
            expect(pointComponent.stringify()).toBe('  10\n90\n  20\n90\n');
            pointComponent = new PointComponent(50,190, 10, true);
            expect(pointComponent.stringify()).toBe('  10\n50\n  20\n190\n  30\n10\n');
            pointComponent = new PointComponent(50,190, 10, true, 1);
            expect(pointComponent.stringify()).toBe('  11\n50\n  21\n190\n  31\n10\n');
            pointComponent = new PointComponent(50,190, 10, true, 8);
            expect(pointComponent.stringify()).toBe('  18\n50\n  28\n190\n  38\n10\n');
            pointComponent = new PointComponent(50,190, 10, false, 8);
            expect(pointComponent.stringify()).toBe('  18\n50\n  28\n190\n');
        });
    });
});


describe('StandardComponent', () => {
    describe('stringify', () => {
        it('should return the correct dxf string', () => {
            let standardComponent = new StandardComponent([[70, 0]]);
            expect(standardComponent.stringify()).toBe('  70\n0\n');
            standardComponent = new StandardComponent([[70, 0], [330, 'A']]);
            expect(standardComponent.stringify()).toBe('  70\n0\n  330\nA\n');
        });
    });
});

describe('SubclassMarkerComponent', () => {
    describe('stringify', () => {
        it('should return the correct dxf string', () => {
            const subclassMarkerComponent = new SubclassMarkerComponent('AcDbCircle');
            expect(subclassMarkerComponent.stringify()).toBe('  100\nAcDbCircle\n');
        });
    });
});

describe('TextStyleComponent', () => {
    describe('stringify', () => {
        it('should return the correct dxf string', () => {
            const textStyleComponent = new TextStyleComponent('Standard');
            expect(textStyleComponent.stringify()).toBe('  7\nStandard\n');
        });
    });
});

describe('ThicknessComponent', () => {
    describe('stringify', () => {
        it('should return the correct dxf string', () => {
            const thicknessComponent = new ThicknessComponent(5);
            expect(thicknessComponent.stringify()).toBe('  39\n5\n');
        });
    });
});

describe('TrueColorComponent', () => {
    describe('stringify', () => {
        it('should return the correct dxf string', () => {
            const trueColorComponent = new TrueColorComponent(200, 100, 50);
            expect(trueColorComponent.stringify()).toBe('  420\n13132850\n');
        });
    });
});
