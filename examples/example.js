const { DxfWriter, point3d, Colors, HatchType, HatchPolylineBoundary, HatchBoundaryPaths, gradient, vertex, Cell } = require('../dist');
const { writeFileSync } = require('fs');

const dxf = new DxfWriter();

// const layer = dxf.addLayer('l_green-Tes“ting*+--/"`\'“"“', Colors.Green)
// dxf.setCurrentLayerName(layer.name)

// const layerBlock = dxf.addLayer('l_red“-Testing*+--/"“`\'"', Colors.Red)

// const block = dxf.addBlock('test/in-outer')
// block.basePoint = point3d(50, 50)
// block.setLayerName(layerBlock.name)
// block.addLine(point3d(0, 0), point3d(100, 100))

// dxf.addInsert(block.name, point3d(0, 0))

// dxf.setZeroLayerAsCurrent()

// const polyline = new HatchPolylineBoundary();
// polyline.add(vertex(0, 0));
// polyline.add(vertex(0, 20));
// polyline.add(vertex(10, 20));
// polyline.add(vertex(10, 0));

// const boundary = new HatchBoundaryPaths();
// // Add the defined path
// boundary.addPolylineBoundary(polyline);

// const mysolid = gradient({
//     // hatchType: HatchType.SOLID,
//     firstColor: 2,
//     secondColor: 2,
// })

// const hatch = dxf.addHatch(boundary, mysolid);

dxf.addLayer("example", Colors.Red, "Continuous");

const myBlock = dxf.addBlock("myBlock");
myBlock.addCircle(point3d(0, 0, 0), 20);
myBlock.addLine(point3d(0, 0, 0), point3d(0, 20, 0));

// Inserting the block
dxf.addTable(myBlock.name, point3d(0, 0, 0), 3, 3, [0.45, 0.36, 0.36], [2.5, 2.5, 2.5], {
    cell: [
        new Cell({
            cellText: 'Sam'
        })
    ]
});

const _str = dxf.stringify();
writeFileSync('examples/example.dxf', _str);
