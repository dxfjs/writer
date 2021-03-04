import Tag                  from "../../Internals/Tag.js";
import ViewPort             from "./Tables/Records/ViewPort.js";
import LineTypeTable        from "./Tables/LineTypeTable.js";
import LayerTable           from "./Tables/LayerTable.js";
import StyleTable           from "./Tables/StyleTable.js";
import ViewTable            from "./Tables/ViewTable.js";
import UCSTable             from "./Tables/UCSTable.js";
import APPIDTable           from "./Tables/APPIDTable.js";
import Layer                from "./Tables/Records/Layer.js";
import DIMStyleTable        from "./Tables/DIMStyleTable.js";
import BlockRecordTable     from "./Tables/BlockRecordTable.js";

export default class Tables {
    get layers(): Layer[] {
        return this._layers.layers;
    }
    get blockRecords(): BlockRecordTable {
        return this._blockRecords;
    }
    private _vports:        ViewPort;
    private _ltypes:        LineTypeTable;
    private readonly _layers:        LayerTable;
    private _styles:        StyleTable;
    private _views:         ViewTable;
    private _ucss:          UCSTable;
    private _appids:        APPIDTable;
    private _dimstyles:     DIMStyleTable;
    private readonly _blockRecords: BlockRecordTable;
    public constructor() {
        this._vports        = new ViewPort();
        this._ltypes        = new LineTypeTable();
        this._layers        = new LayerTable();
        this._styles        = new StyleTable();
        this._views         = new ViewTable();
        this._ucss          = new UCSTable();
        this._appids        = new APPIDTable();
        this._dimstyles     = new DIMStyleTable();
        this._blockRecords = new BlockRecordTable();

        this.addLineType('ByBlock', '', []);
        this.addLineType('ByLayer', '', []);
        this.addLineType('Continuous', 'Solid line', []);

        this.addLayer('0', 7, 'CONTINUOUS', 0);

        this.addStyle('Standard')

        this.addAPPID('ACAD', 0);

        this.addDIMStyle('Standard', 0);
    }

    public addLineType(name: string, descriptive: string, elements: number []) {
        this._ltypes.addLineType(name, descriptive, elements);
    }

    public addLayer(name: string, color: number, lineType: string, flag: number) {
        this._layers.addLayer(name, color, lineType, flag);
    }

    public addStyle(name: string) {
        this._styles.addStyle(name);
    }

    public addView() {
        this._views.addView();
    }

    public addUCS() {
        this._ucss.addUCS();
    }

    public addAPPID(name: string, flag: number) {
        this._appids.addAPPID(name, flag);
    }

    public addDIMStyle(name: string, flag: number) {
        this._dimstyles.addDIMStyle(name, flag);
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...this._vports.tags());
        tags.push(...this._ltypes.tags());
        tags.push(...this._layers.tags());
        tags.push(...this._styles.tags());
        tags.push(...this._views.tags());
        tags.push(...this._ucss.tags());
        tags.push(...this._appids.tags());
        tags.push(...this._dimstyles.tags());
        tags.push(...this._blockRecords.tags());
        return tags;
    }
    public stringify(): string {
        let str = '';
        str += new Tag(0, 'SECTION').stringify();
        str += new Tag(2, 'TABLES').stringify();
        str += this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
        str += new Tag(0, 'ENDSEC').stringify();
        return str;
    }
}
