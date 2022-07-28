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

	dxify(mg: Dxifier): void {
		mg.subclassMarker('AcDbDimStyleTable');
		mg.type('DIMSTYLE');
		mg.push(105, this.handle);
		mg.push(330, this.ownerObjectHandle);
		mg.subclassMarker('AcDbSymbolTableRecord');
		mg.push(100, 'AcDbDimStyleTableRecord');
		mg.push(2, this.name);
		mg.push(70, this.flags);
		mg.push(40, 1);
		mg.push(41, 2.5);
		mg.push(42, 0.625);
		mg.push(43, 0.38);
		mg.push(44, 1.25);
		mg.push(45, 0);
		mg.push(46, 0);
		mg.push(47, 0);
		mg.push(48, 0);
		// mg.push(49, 1); // Not exist in the DXF Spec
		mg.push(140, 2.5);
		mg.push(141, 0.09);
		mg.push(142, 2.5);
		mg.push(143, 25.4);
		mg.push(144, 1);
		mg.push(145, 0);
		mg.push(146, 1);
		mg.push(147, 0.625);
		mg.push(148, 0);
		mg.push(71, 0);
		mg.push(72, 0);
		mg.push(73, 0);
		mg.push(74, 1);
		mg.push(75, 0);
		mg.push(76, 0);
		mg.push(77, 0);
		mg.push(78, 1);
		mg.push(79, 0);
		mg.push(170, 0);
		mg.push(171, 2);
		mg.push(172, 0);
		mg.push(173, 0);
		mg.push(174, 0);
		mg.push(175, 0);
		mg.push(176, 0);
		mg.push(177, 0);
		mg.push(178, 0);
		mg.push(179, 0);
		mg.push(271, 2);
		mg.push(272, 4);
		mg.push(273, 2);
		mg.push(274, 2);
		mg.push(275, 0);
		mg.push(276, 0);
		mg.push(277, 2);
		mg.push(278, 0);
		mg.push(279, 0);
		mg.push(280, 0);
		mg.push(281, 0);
		mg.push(282, 0);
		mg.push(283, 1);
		mg.push(284, 0);
		mg.push(285, 0);
		mg.push(286, 0);
		mg.push(288, 0);
		mg.push(289, 3);
		mg.push(340, 'standard'); // TODO ??????????
		mg.push(341, '');
		mg.push(371, '-2');
		mg.push(372, '-2');
	}
}
