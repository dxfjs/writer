import Tag          from "../../../../Internals/Tag";
import DXFManager   from "../../../../Internals/DXFManager";

export default class ViewPort extends DXFManager {
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    private _handleToOwner: string;
    private readonly _vportHandle: string;
    public constructor() {
        super();
        this._handleToOwner = '0';
        this._vportHandle = this.handleSeed();
    }
    public tags(): Tag[] {
        return this.standard([
            [0, 'TABLE'],               [2, 'VPORT'],   [5, this.handle],   [330, 0],
            [100, 'AcDbSymbolTable'],   [70, 1],        [0, 'VPORT'],       [5, this._vportHandle],

            [330, this.handle],         [100, 'AcDbSymbolTableRecord'], [100, 'AcDbViewportTableRecord'],

            [2, '*ACTIVE'],     [70, 0],    [10, 0],    [20, 0],    [11, 1],    [21, 1],

            [12, 184], // TODO
            [22, 98.75], // TODO

            [13, 0],    [23, 0], [14, 10], [24, 10], [15, 10],
            [25, 10],   [16, 0], [26, 0], [36, 1],
            [17, 0],    [27, 0], [37, 0], [40, 210],

            [41, 1.811904761904762], // TODO

            [42, 50],   [43, 0],    [44, 0],        [50, 0],        [51, 0],    [71, 0],
            [72, 100],  [73, 1],    [74, 3],        [75, 0],        [76, 1],
            [77, 0],    [78, 0],    [281, 0],       [65, 1],        [110, 0],   [120, 0],
            [130, 0],   [111, 1],   [121, 0],       [131, 0],       [112, 0],
            [122, 1],   [132, 0],   [79, 0],        [146, 0],       [348, 10020],
            [60, 7],    [61, 5],    [292, 1],       [282, 1],       [141, 0],
            [142, 0],   [63, 250],  [421, 3358443], [0, 'ENDTAB'],
        ]);
    }
}
