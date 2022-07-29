import { Dxifier } from '../../../../Internals/Dxifier';
import Handle from '../../../../Internals/Handle';
import DxfInterface from '../../../../Internals/Interfaces/DxfInterface';

export enum DimStyleFlags {
	None = 0,
	XRefDependent = 16,
	XRefRefesolved = 32,
}

// TODO: Refactor this class to be more dynamic
export default class DxfDimStyle implements DxfInterface {
	readonly name: string;
	readonly flags: DimStyleFlags;
	readonly handle: string;
	ownerObjectHandle?: string;
	readonly type: string;

	constructor(name: string, flags?: DimStyleFlags) {
		this.name = name;
		this.flags = flags ?? DimStyleFlags.None;
		this.handle = Handle.next();
		this.type = 'DIMSTYLE';
	}

	dxify(dx: Dxifier): void {
		dx.subclassMarker('AcDbDimStyleTable');
		dx.type('DIMSTYLE');
		dx.push(105, this.handle);
		dx.push(330, this.ownerObjectHandle);
		dx.subclassMarker('AcDbSymbolTableRecord');
		dx.push(100, 'AcDbDimStyleTableRecord');
		dx.push(2, this.name);
		dx.push(70, this.flags);
		dx.push(40, 1);
		dx.push(41, 2.5);
		dx.push(42, 0.625);
		dx.push(43, 0.38);
		dx.push(44, 1.25);
		dx.push(45, 0);
		dx.push(46, 0);
		dx.push(47, 0);
		dx.push(48, 0);
		// dx.push(49, 1); // Not exist in the DXF Spec
		dx.push(140, 2.5);
		dx.push(141, 0.09);
		dx.push(142, 2.5);
		dx.push(143, 25.4);
		dx.push(144, 1);
		dx.push(145, 0);
		dx.push(146, 1);
		dx.push(147, 0.625);
		dx.push(148, 0);
		dx.push(71, 0);
		dx.push(72, 0);
		dx.push(73, 0);
		dx.push(74, 1);
		dx.push(75, 0);
		dx.push(76, 0);
		dx.push(77, 0);
		dx.push(78, 1);
		dx.push(79, 0);
		dx.push(170, 0);
		dx.push(171, 2);
		dx.push(172, 0);
		dx.push(173, 0);
		dx.push(174, 0);
		dx.push(175, 0);
		dx.push(176, 0);
		dx.push(177, 0);
		dx.push(178, 0);
		dx.push(179, 0);
		dx.push(271, 2);
		dx.push(272, 4);
		dx.push(273, 2);
		dx.push(274, 2);
		dx.push(275, 0);
		dx.push(276, 0);
		dx.push(277, 2);
		dx.push(278, 0);
		dx.push(279, 0);
		dx.push(280, 0);
		dx.push(281, 0);
		dx.push(282, 0);
		dx.push(283, 1);
		dx.push(284, 0);
		dx.push(285, 0);
		dx.push(286, 0);
		dx.push(288, 0);
		dx.push(289, 3);
		dx.push(340, 'standard'); // TODO ??????????
		dx.push(341, '');
		dx.push(371, '-2');
		dx.push(372, '-2');
	}
}
