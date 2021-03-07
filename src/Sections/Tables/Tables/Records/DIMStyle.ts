import Tag          from "../../../../Internals/Tag";
import DXFManager   from "../../../../Internals/DXFManager";

// TODO refactor this class to be more dynamic
export default class DIMStyle extends DXFManager {
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
        super();
        this._dimStyleName = name;
        this._flag = flag;
        this._handleToOwner = '0';
    }

    public tags(): Tag[] {
        return this.standard([
            [0, 'DIMSTYLE'], [105, this.handle], [330, this.handleToOwner],
            [100, 'AcDbSymbolTableRecord'], [100, 'AcDbDimStyleTableRecord'],
            [2, this.dimStyleName], [70, this.flag],

            [40, 1],        [41, 2.5],      [42, 0.625],
            [43, 0.38],     [44, 1.25],     [45, 0],
            [46, 0],        [47, 0],        [48, 0], [49, 1],

            [140, 2.5],     [141, 0.09],    [142, 2.5],
            [143, 25.4],    [144, 1],       [145, 0],
            [146, 1],       [147, 0.625],   [148, 0],

            [71, 0],        [72, 0],        [73, 0],
            [74, 1],        [75, 0],        [76, 0],
            [77, 0],        [78, 1],        [79, 0],

            [170, 0],       [171, 2],       [172, 0],
            [173, 0],       [174, 0],       [175, 0],
            [176, 0],       [177, 0],       [178, 0], [179, 0],

            [271, 2],       [272, 4],       [273, 2],
            [274, 2],       [275, 0],       [276, 0],
            [277, 2],       [278, 0],       [279, 0],
            [280, 0],       [281, 0],       [282, 0],
            [283, 1],       [284, 0],       [285, 0],
            [286, 0],       [288, 0],       [289, 3],

            [340, 'standard'], [341, ''], [371, '-2'], [372, '-2']
        ]);
    }
};
