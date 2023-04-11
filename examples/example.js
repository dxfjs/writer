const { DxfWriter, point3d, Colors, HatchType, HatchPolylineBoundary, HatchBoundaryPaths, gradient, vertex, MTextAttachmentPoint, MTextDrawingDirection, MTextLineSpacingStyle, Cell} = require('../dist');
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

const myBlock = dxf.addBlock("\*T1");
myBlock.addMText(point3d(3.75, -0.226), 0.25, 'title', {
    attachmentPoint: MTextAttachmentPoint.MiddleCenter,
    drawingDirection: MTextDrawingDirection.ByStyle,
    lineSpacingStyle: MTextLineSpacingStyle.AtLeast,
    width: 7.379,
});
myBlock.addMText(point3d(1.25, -0.633), 0.18, 'h1', {
    attachmentPoint: MTextAttachmentPoint.MiddleCenter,
    drawingDirection: MTextDrawingDirection.ByStyle,
    lineSpacingStyle: MTextLineSpacingStyle.AtLeast,
    width: 2.379,
});
myBlock.addMText(point3d(3.75, -0.633), 0.18, 'h2', {
    attachmentPoint: MTextAttachmentPoint.MiddleCenter,
    drawingDirection: MTextDrawingDirection.ByStyle,
    lineSpacingStyle: MTextLineSpacingStyle.AtLeast,
    width: 2.379,
});
myBlock.addMText(point3d(6.25, -0.633), 0.18, 'h3', {
    attachmentPoint: MTextAttachmentPoint.MiddleCenter,
    drawingDirection: MTextDrawingDirection.ByStyle,
    lineSpacingStyle: MTextLineSpacingStyle.AtLeast,
    width: 2.379,
});
myBlock.addMText(point3d(1.25, -0.873), 0.18, 't1', {
    attachmentPoint: MTextAttachmentPoint.TopCenter,
    drawingDirection: MTextDrawingDirection.ByStyle,
    lineSpacingStyle: MTextLineSpacingStyle.AtLeast,
    width: 2.379,
});
myBlock.addMText(point3d(3.75, -0.873), 0.18, 't2', {
    attachmentPoint: MTextAttachmentPoint.TopCenter,
    drawingDirection: MTextDrawingDirection.ByStyle,
    lineSpacingStyle: MTextLineSpacingStyle.AtLeast,
    width: 2.379,
});
myBlock.addMText(point3d(6.25, -0.873), 0.18, 't3', {
    attachmentPoint: MTextAttachmentPoint.TopCenter,
    drawingDirection: MTextDrawingDirection.ByStyle,
    lineSpacingStyle: MTextLineSpacingStyle.AtLeast,
    width: 2.379,
});
myBlock.addLine(point3d(0, 0, 0), point3d(7.5, 0, 0));
myBlock.addLine(point3d(0, -0.453, 0), point3d(7.5, -0.453, 0));
myBlock.addLine(point3d(0, -0.813, 0), point3d(7.5, -0.813, 0));
myBlock.addLine(point3d(0, -1.173, 0), point3d(7.5, -1.173, 0));
myBlock.addLine(point3d(0, 0, 0), point3d(0, -1.173, 0));
myBlock.addLine(point3d(2.5, -0.453, 0), point3d(2.5, -1.173, 0));
myBlock.addLine(point3d(5, -0.453, 0), point3d(5, -1.173, 0));
myBlock.addLine(point3d(7.5, 0, 0), point3d(7.5, -1.173, 0));
myBlock.addLine(point3d(0, 0, 0), point3d(0, 0, 0));

// Inserting the block
dxf.addTable(myBlock.name, point3d(0, 0, 0), 3, 3, [0.45, 0.36, 0.36], [2.5, 2.5, 2.5], {
    cell: [
        new Cell({
            cellText: 'title'
        }),
        new Cell({
            
        }),
        new Cell({

        }),
        new Cell({
            cellText: 'h1'
        }),
        new Cell({
            cellText: 'h2'
        }),
        new Cell({
            cellText: 'h3'
        }),
        new Cell({
            cellText: 't1'
        }),
        new Cell({
            cellText: 't2'
        }),
        new Cell({
            cellText: 't3'
        }),
    ]
});

// dxf.addInsert(myBlock.name, point3d(0, 0));

const _str = dxf.stringify();
writeFileSync('examples/example.dxf', _str);
