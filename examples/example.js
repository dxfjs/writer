import DxfWriter, {
	point2d,
	point3d,
	addBlock,
	addEllipse,
	add3dFace,
	InvisibleEdgeFlags,
} from '../lib';
import * as fs from 'fs';

const dxf = new DxfWriter();

/*dxf.addLine(point3d(0, 0, 0), point3d(100, 100, 0), {});
dxf.addLWPolyline(
	[point3d(200, 0, 0), point3d(300, 100, 0), point3d(300, 200, 0)],
	129,
	{}
);*/
dxf.addImage(
	'.\\X_462419.04_Y_576568.45_S_433.54_R_359.74.png',
	'X_462419.04_Y_576568.45_S_433.54_R_359.74',
	point3d(462419.04, 576568.45, 0),
	1792,
	1280,
	433.54,
	360 - 359.74
);

/*dxf.addLineType('AXES', '____ _ ', [4, -1, 1, -1]);

dxf.addRectangle(point2d(400, 400), point2d(600, 200), {
	elevation: 30,
	constantWidth: 10,
	lineType: 'AXES',
	lineTypeScale: 10,
});*/

/*const circleBlock = addBlock('circle');
circleBlock.addCircle(point3d(0, 0, 0), 50);
circleBlock.addRectangle(
	point2d(-35.3553, 35.3553),
	point2d(35.3553, -35.3553)
);

dxf.addInsert(circleBlock.name, point3d(0, 0, 0));

const controlPoints = [
	point3d(0, 0, 0),
	point3d(10, 10, 0),
	point3d(20, 10, 0),
	point3d(30, 20, 0),
];

dxf.addSpline({
	controlPoints,
});

dxf.addArc(point3d(0, 0, 0), 10, 0, 45);

const e = addEllipse(
	point3d(100, 100, 0),
	point3d(50, 0, 0),
	0.5,
	0,
	2 * Math.PI
);

const f = add3dFace(
	point3d(0, 0, 0),
	point3d(0, 100, 0),
	point3d(100, 100, 0),
	point3d(100, 0, 0),
	{
		invisibleEdges: InvisibleEdgeFlags.First | InvisibleEdgeFlags.Fourth,
	}
);*/

fs.writeFileSync('examples/example.dxf', dxf.stringify());
console.log('Exec!!');
