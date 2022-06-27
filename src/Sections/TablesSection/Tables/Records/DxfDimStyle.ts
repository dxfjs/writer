import Handle from '../../../../Internals/Handle';
import DxfInterface from '../../../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../../../Internals/TagsManager';

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

	constructor(name: string, flags?: DimStyleFlags) {
		this.name = name;
		this.flags = flags ?? DimStyleFlags.None;
		this.handle = Handle.next();
	}

	stringify(): string {
		return this.manager.stringify();
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.subclassMarker('AcDbDimStyleTable');
		manager.entityType('DIMSTYLE');
		manager.add(105, this.handle);
		manager.add(330, this.ownerObjectHandle);
		manager.subclassMarker('AcDbSymbolTableRecord');
		manager.add(100, 'AcDbDimStyleTableRecord');
		manager.add(2, this.name);
		manager.add(70, this.flags);
		manager.add(40, 1);
		manager.add(41, 2.5);
		manager.add(42, 0.625);
		manager.add(43, 0.38);
		manager.add(44, 1.25);
		manager.add(45, 0);
		manager.add(46, 0);
		manager.add(47, 0);
		manager.add(48, 0);
		// manager.add(49, 1); // Not exist in the DXF Spec
		manager.add(140, 2.5);
		manager.add(141, 0.09);
		manager.add(142, 2.5);
		manager.add(143, 25.4);
		manager.add(144, 1);
		manager.add(145, 0);
		manager.add(146, 1);
		manager.add(147, 0.625);
		manager.add(148, 0);
		manager.add(71, 0);
		manager.add(72, 0);
		manager.add(73, 0);
		manager.add(74, 1);
		manager.add(75, 0);
		manager.add(76, 0);
		manager.add(77, 0);
		manager.add(78, 1);
		manager.add(79, 0);
		manager.add(170, 0);
		manager.add(171, 2);
		manager.add(172, 0);
		manager.add(173, 0);
		manager.add(174, 0);
		manager.add(175, 0);
		manager.add(176, 0);
		manager.add(177, 0);
		manager.add(178, 0);
		manager.add(179, 0);
		manager.add(271, 2);
		manager.add(272, 4);
		manager.add(273, 2);
		manager.add(274, 2);
		manager.add(275, 0);
		manager.add(276, 0);
		manager.add(277, 2);
		manager.add(278, 0);
		manager.add(279, 0);
		manager.add(280, 0);
		manager.add(281, 0);
		manager.add(282, 0);
		manager.add(283, 1);
		manager.add(284, 0);
		manager.add(285, 0);
		manager.add(286, 0);
		manager.add(288, 0);
		manager.add(289, 3);
		manager.add(340, 'standard'); // TODO ??????????
		manager.add(341, '');
		manager.add(371, '-2');
		manager.add(372, '-2');
		return manager;
	}
}
