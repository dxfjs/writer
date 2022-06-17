import DxfWriter, {
	HatchPredefinedPatterns,
	HatchBoundaryPath,
	HatchPolylineBoundary,
} from '../lib';
import * as fs from 'fs';

const dxf = new DxfWriter();


const boundary = new HatchBoundaryPath()
const polylineBoundary = new HatchPolylineBoundary()
polylineBoundary.add({
	x: 0,
	y: 0
})
polylineBoundary.add({
	x: 0,
	y: 10000
})
polylineBoundary.add({
	x: 10000,
	y: 10000
})
polylineBoundary.add({
	x: 10000,
	y: 0
})
boundary.setPolylineBoundary(polylineBoundary)
dxf.addHatch(HatchPredefinedPatterns.ACAD_ISO02W100, boundary)

fs.writeFileSync('examples/example.dxf', dxf.stringify());
console.log('Exec!!');
