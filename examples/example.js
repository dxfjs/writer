const { DxfWriter, point3d, HatchPolylineBoundary, vertex, HatchBoundaryPaths, HatchPredefinedPatterns, pattern } = require('../dist');
const { writeFileSync } = require('fs');
const dxf = new DxfWriter();
// d.setVariable('$DIMTXT', { 40: 10 });
// d.modelSpace.addRadialDim(point3d(0, 0, 0), point3d(100, 0, 0));
// d.addAngularLinesDim(
// 	{
// 		start: point3d(200, 200),
// 		end: point3d(200, 300),
// 	},
// 	{
// 		start: point3d(300, 100),
// 		end: point3d(400, 200),
// 	},
// 	point3d(300, 300)
// );
// const polyline = new HatchPolylineBoundary();
// polyline.add(vertex(0, 0));
// polyline.add(vertex(0, 10000));
// polyline.add(vertex(10000, 10000));
// polyline.add(vertex(10000, 0));

// const boundary = new HatchBoundaryPaths();
// // Add the defined path
// boundary.addPolylineBoundary(polyline);

// const mysolid = pattern({
// 	name: HatchPredefinedPatterns.STEEL,
// 	// Other properties you can define optionally
// 	// angle?: number;
// 	// scale?: number;
// 	// double?: boolean;
//   });

//   dxf.addHatch(boundary, mysolid);

dxf.addLeader();

const _str = dxf.stringify();
writeFileSync('examples/example.dxf', _str);
