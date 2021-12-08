import Tag from '../../../../Internals/Tag';
import DXFManager from '../../../../Internals/DXFManager';

export default class ViewPort extends DXFManager {
    set viewCenter(value: [number, number]) {
        this._viewCenter = value;
    }
    get viewCenter(): [number, number] {
        return this._viewCenter;
    }
    get viewHeight(): number {
        return this._viewHeight;
    }

    set viewHeight(value: number) {
        this._viewHeight = value;
    }
    get handleToOwner(): string {
        return this._handleToOwner;
    }

    set handleToOwner(value: string) {
        this._handleToOwner = value;
    }
    private _handleToOwner: string;
    private readonly _vportHandle: string;
    private _viewHeight: number;
    private _viewCenter: [number, number];
    public constructor() {
        super();
        this._handleToOwner = '0';
        this._vportHandle = this.handleSeed();
        this._viewHeight = 200;
        this._viewCenter = [0, 0];
    }
    public tags(): Tag[] {
        const [x, y] = this.viewCenter;
        return this.makeStandard([
            [0, 'TABLE'],
            [2, 'VPORT'],
            [5, this.handle],
            [100, 'AcDbSymbolTable'],
            [0, 'VPORT'],
            [5, this._vportHandle],

            [330, this.handle],
            [100, 'AcDbSymbolTableRecord'],
            [100, 'AcDbViewportTableRecord'],

            [2, '*ACTIVE'],

            [40, this.viewHeight],

            [0, 'ENDTAB'],
        ]);
    }
}
