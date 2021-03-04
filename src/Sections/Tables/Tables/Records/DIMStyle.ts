import Tag          from "../../../../Internals/Tag.js";
import DXFManager   from "../../../../Internals/DXFManager.js";
import DXFInterface from "../../../../Internals/Interfaces/DXFInterface.js";

// TODO refactor this class to be more dynamic
export default class DIMStyle extends DXFManager implements DXFInterface {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    get flag(): number {
        return this._flag;
    }
    get dimStyleName(): string {
        return this._dimStyleName;
    }
    private readonly _dimStyleName: string;
    private readonly _flag: number;
    private _handleToOwner: string;
    public constructor(name: string, flag: number) {
        super(DXFManager.version);
        this._dimStyleName = name;
        this._flag = flag;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'DIMSTYLE'));
        tags.push(new Tag(105, this.handle));
        tags.push(new Tag(330, this.handleToOwner));
        tags.push(new Tag(100, 'AcDbSymbolTableRecord'));
        tags.push(new Tag(100, 'AcDbDimStyleTableRecord'));
        tags.push(new Tag(2, this.dimStyleName));
        tags.push(new Tag(70, this.flag));

        tags.push(new Tag(40, 1));
        tags.push(new Tag(41, 2.5));
        tags.push(new Tag(42, 0.625));
        tags.push(new Tag(43, 0.38));
        tags.push(new Tag(44, 1.25));
        tags.push(new Tag(45, 0));
        tags.push(new Tag(46, 0));
        tags.push(new Tag(47, 0));
        tags.push(new Tag(48, 0));
        tags.push(new Tag(49, 1));

        tags.push(new Tag(140, 2.5));
        tags.push(new Tag(141, 0.09));
        tags.push(new Tag(142, 2.5));
        tags.push(new Tag(143, 25.4));
        tags.push(new Tag(144, 1));
        tags.push(new Tag(145, 0));
        tags.push(new Tag(146, 1));
        tags.push(new Tag(147, 0.625));
        tags.push(new Tag(148, 0));

        tags.push(new Tag(71, 0));
        tags.push(new Tag(72, 0));
        tags.push(new Tag(73, 0));
        tags.push(new Tag(74, 1));
        tags.push(new Tag(75, 0));
        tags.push(new Tag(76, 0));
        tags.push(new Tag(77, 0));
        tags.push(new Tag(78, 1));
        tags.push(new Tag(79, 0));

        tags.push(new Tag(170, 0));
        tags.push(new Tag(171, 2));
        tags.push(new Tag(172, 0));
        tags.push(new Tag(173, 0));
        tags.push(new Tag(174, 0));
        tags.push(new Tag(175, 0));
        tags.push(new Tag(176, 0));
        tags.push(new Tag(177, 0));
        tags.push(new Tag(178, 0));
        tags.push(new Tag(179, 0));

        tags.push(new Tag(271, 2));
        tags.push(new Tag(272, 4));
        tags.push(new Tag(273, 2));
        tags.push(new Tag(274, 2));
        tags.push(new Tag(275, 0));
        tags.push(new Tag(276, 0));
        tags.push(new Tag(277, 2));
        tags.push(new Tag(278, 0));
        tags.push(new Tag(279, 0));
        tags.push(new Tag(280, 0));
        tags.push(new Tag(281, 0));
        tags.push(new Tag(282, 0));
        tags.push(new Tag(283, 1));
        tags.push(new Tag(284, 0));
        tags.push(new Tag(285, 0));
        tags.push(new Tag(286, 0));
        tags.push(new Tag(288, 0));
        tags.push(new Tag(289, 3));


        tags.push(new Tag(340, 'standard'));
        tags.push(new Tag(341, ''));
        tags.push(new Tag(371, '-2'));
        tags.push(new Tag(372, '-2'));
        return tags;
    }

    stringify(): string {
        return this.tags().reduce((str, tag) => {
            return `${str}${tag.stringify()}`;
        }, '');
    }
};
