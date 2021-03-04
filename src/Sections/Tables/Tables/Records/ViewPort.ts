import Tag          from "../../../../Internals/Tag.js";
import DXFManager   from "../../../../Internals/DXFManager.js";
import DXFInterface from "../../../../Internals/Interfaces/DXFInterface.js";

export default class ViewPort extends DXFManager implements DXFInterface {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    private _handleToOwner: string;
    public constructor() {
        super();
        this._handleToOwner = '0';
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'TABLE'));
        tags.push(new Tag(2, 'VPORT'));
        tags.push(new Tag(5, this.handle));
        tags.push(new Tag(330, 0));
        tags.push(new Tag(100, 'AcDbSymbolTable'));
        tags.push(new Tag(70, 1));
        tags.push(new Tag(0, 'VPORT'));
        tags.push(new Tag(5, this.handleSeed()));
        tags.push(new Tag(330, this.handle));
        tags.push(new Tag(100, 'AcDbSymbolTableRecord'));
        tags.push(new Tag(100, 'AcDbViewportTableRecord'));
        tags.push(new Tag(2, '*ACTIVE'));
        tags.push(new Tag(70, 0));
        tags.push(new Tag(10, 0));
        tags.push(new Tag(20, 0));
        tags.push(new Tag(11, 1));
        tags.push(new Tag(21, 1));
        tags.push(new Tag(12, 184)); // TODO
        tags.push(new Tag(22, 98.75)); // TODO
        tags.push(new Tag(13, 0));
        tags.push(new Tag(23, 0));
        tags.push(new Tag(14, 10));
        tags.push(new Tag(24, 10));
        tags.push(new Tag(15, 10));
        tags.push(new Tag(25, 10));
        tags.push(new Tag(16, 0));
        tags.push(new Tag(26, 0));
        tags.push(new Tag(36, 1));
        tags.push(new Tag(17, 0));
        tags.push(new Tag(27, 0));
        tags.push(new Tag(37, 0));
        tags.push(new Tag(40, 210));
        tags.push(new Tag(41, 1.811904761904762)); // TODO
        tags.push(new Tag(42, 50));
        tags.push(new Tag(43, 0));
        tags.push(new Tag(44, 0));
        tags.push(new Tag(50, 0));
        tags.push(new Tag(51, 0));
        tags.push(new Tag(71, 0));
        tags.push(new Tag(72, 100));
        tags.push(new Tag(73, 1));
        tags.push(new Tag(74, 3));
        tags.push(new Tag(75, 0));
        tags.push(new Tag(76, 1));
        tags.push(new Tag(77, 0));
        tags.push(new Tag(78, 0));
        tags.push(new Tag(281, 0));
        tags.push(new Tag(65, 1));
        tags.push(new Tag(110, 0));
        tags.push(new Tag(120, 0));
        tags.push(new Tag(130, 0));
        tags.push(new Tag(111, 1));
        tags.push(new Tag(121, 0));
        tags.push(new Tag(131, 0));
        tags.push(new Tag(112, 0));
        tags.push(new Tag(122, 1));
        tags.push(new Tag(132, 0));
        tags.push(new Tag(79, 0));
        tags.push(new Tag(146, 0));
        tags.push(new Tag(348, 10020));
        tags.push(new Tag(60, 7));
        tags.push(new Tag(61, 5));
        tags.push(new Tag(292, 1));
        tags.push(new Tag(282, 1));
        tags.push(new Tag(141, 0));
        tags.push(new Tag(142, 0));
        tags.push(new Tag(63, 250));
        tags.push(new Tag(421, 3358443));
        tags.push(new Tag(0, 'ENDTAB'));
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return `${str}${tag.stringify()}`;
        }, '');
    }
}
