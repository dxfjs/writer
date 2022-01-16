import Handle from '../../../../Internals/Handle';
import DxfInterface from '../../../../Internals/Interfaces/DxfInterface';
import TagsManager from '../../../../Internals/TagsManager';

// TODO: Refactor this class to be more dynamic
export default class DxfDimStyle extends Handle implements DxfInterface {
	readonly name: string;
	readonly flags: number;

	public constructor(name: string, flags?: number) {
		super();
		this.name = name;
		this.flags = flags ?? 0;
	}

	public stringify(): string {
		return this.manager.stringify();
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.subclassMarker('AcDbDimStyleTable');
		manager.entityType('DIMSTYLE');
		manager.addTag(105, this.handle);
		manager.pushTag(this.softPointerTag());
		manager.subclassMarker('AcDbSymbolTableRecord');
		manager.addTag(100, 'AcDbDimStyleTableRecord');
		manager.addTag(2, this.name);
		manager.addTag(70, this.flags);
		manager.addTag(40, 1);
		manager.addTag(41, 2.5);
		manager.addTag(42, 0.625);
		manager.addTag(43, 0.38);
		manager.addTag(44, 1.25);
		manager.addTag(45, 0);
		manager.addTag(46, 0);
		manager.addTag(47, 0);
		manager.addTag(48, 0);
		manager.addTag(49, 1);
		manager.addTag(140, 2.5);
		manager.addTag(141, 0.09);
		manager.addTag(142, 2.5);
		manager.addTag(143, 25.4);
		manager.addTag(144, 1);
		manager.addTag(145, 0);
		manager.addTag(146, 1);
		manager.addTag(147, 0.625);
		manager.addTag(148, 0);
		manager.addTag(71, 0);
		manager.addTag(72, 0);
		manager.addTag(73, 0);
		manager.addTag(74, 1);
		manager.addTag(75, 0);
		manager.addTag(76, 0);
		manager.addTag(77, 0);
		manager.addTag(78, 1);
		manager.addTag(79, 0);
		manager.addTag(170, 0);
		manager.addTag(171, 2);
		manager.addTag(172, 0);
		manager.addTag(173, 0);
		manager.addTag(174, 0);
		manager.addTag(175, 0);
		manager.addTag(176, 0);
		manager.addTag(177, 0);
		manager.addTag(178, 0);
		manager.addTag(179, 0);
		manager.addTag(271, 2);
		manager.addTag(272, 4);
		manager.addTag(273, 2);
		manager.addTag(274, 2);
		manager.addTag(275, 0);
		manager.addTag(276, 0);
		manager.addTag(277, 2);
		manager.addTag(278, 0);
		manager.addTag(279, 0);
		manager.addTag(280, 0);
		manager.addTag(281, 0);
		manager.addTag(282, 0);
		manager.addTag(283, 1);
		manager.addTag(284, 0);
		manager.addTag(285, 0);
		manager.addTag(286, 0);
		manager.addTag(288, 0);
		manager.addTag(289, 3);
		manager.addTag(340, 'standard'); // TODO ??????????
		manager.addTag(341, '');
		manager.addTag(371, '-2');
		manager.addTag(372, '-2');
		return manager;
	}
}
