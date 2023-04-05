const { DxfWriter, point3d, MTextAttachmentPoint, MTextDrawingDirection, MTextLineSpacingStyle } = require('../dist');
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


dxf.addMText(point3d(20, 20), 0.2, 'GGWP vbajsbvlj fdvjhbsdfvjhbw akkfjvldf', {
    rotation: 30,
	attachmentPoint: MTextAttachmentPoint.MiddleCenter,
    drawingDirection: MTextDrawingDirection.ByStyle,
    lineSpacingStyle: MTextLineSpacingStyle.AtLeast,
    width: 2,
});
const _str = dxf.stringify();
writeFileSync('examples/example.dxf', _str);
