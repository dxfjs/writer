import UCSTable             from "./Tables/UCSTable";
import ViewTable            from "./Tables/ViewTable";
import LayerTable           from "./Tables/LayerTable";
import StyleTable           from "./Tables/StyleTable";
import Tag                  from "../../Internals/Tag";
import APPIDTable           from "./Tables/APPIDTable";
import Entities             from "../Entities/Entities";
import Layer                from "./Tables/Records/Layer";
import LineTypeTable        from "./Tables/LineTypeTable";
import DIMStyleTable        from "./Tables/DIMStyleTable";
import BlockRecordTable     from "./Tables/BlockRecordTable";
import ViewPort             from "./Tables/Records/ViewPort";

export default class Tables {

    get entities(): Entities {
        return this._entities;
    }

    set entities(value: Entities) {
        this._entities = value;
    }
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

    private _entities: Entities = new Entities();

    public constructor() {
        this._vports        = new ViewPort();
        this._ltypes        = new LineTypeTable();
        this._layers        = new LayerTable();
        this._styles        = new StyleTable();
        this._views         = new ViewTable();
        this._ucss          = new UCSTable();
        this._appids        = new APPIDTable();
        this._dimstyles     = new DIMStyleTable();
        this._blockRecords  = new BlockRecordTable();

        this.addLineType('ByBlock', '', []);
        this.addLineType('ByLayer', '', []);
        this.addLineType('Continuous', 'Solid line', []);

        this.addLayer('0', 7, 'CONTINUOUS', 0);

        this.addStyle('Standard');

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
        const [x, y] = this.entities.centerView();
        this.setViewCenter([x, y]);
        this.setViewHeight(this.entities.viewHeight());
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

    public setViewHeight(viewHeight: number) {
        this._vports.viewHeight = viewHeight;
    }

    public setViewCenter(viewCenter: [number, number]) {
        this._vports.viewCenter = viewCenter;
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
