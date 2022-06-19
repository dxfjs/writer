import { DimStyleRecordSpec } from "./DxfTablesSpecifications";
import DxfTableParser from "./DxfTableParser";
import { RecordCommons } from "./DxfTablesParser";
import Tokenizer, { entity } from "../Tokenizer";


export interface DimStyleRecord extends RecordCommons {
    name: string;
    flags: number;
    DIMPOST: string;
    DIMAPOST: string;
    DIMSCALE: number;
    DIMASZ: number;
    DIMEXO: number;
    DIMDLI: number;
    DIMEXE: number;
    DIMRND: number;
    DIMDLE: number;
    DIMTP: number;
    DIMTM: number;
    DIMTXT: number;
    DIMCEN: number;
    DIMTSZ: number;
    DIMALTF: number;
    DIMLFAC: number;
    DIMTVP: number;
    DIMTFAC: number;
    DIMGAP: number;
    DIMALTRND: number;
    DIMTOL: number;
    DIMLIM: number;
    DIMTIH: number;
    DIMTOH: number;
    DIMSE1: number;
    DIMSE2: number;
    DIMTAD: number;
    DIMZIN: number;
    DIMAZIN: number;
    DIMALT: number;
    DIMALTD: number;
    DIMTOFL: number;
    DIMSAH: number;
    DIMTIX: number;
    DIMSOXD: number;
    DIMCLRD: number;
    DIMCLRE: number;
    DIMCLRT: number;
    DIMADEC: number;
    DIMDEC: number;
    DIMTDEC: number;
    DIMALTU: number;
    DIMALTTD: number;
    DIMAUNIT: number;
    DIMFRAC: number;
    DIMLUNIT: number;
    DIMDSEP: number;
    DIMTMOVE: number;
    DIMJUST: number;
    DIMSD1: number;
    DIMSD2: number;
    DIMTOLJ: number;
    DIMTZIN: number;
    DIMALTZ: number;
    DIMALTTZ: number;
    DIMFIT: number;
    DIMUPT: number;
    DIMATFIT: number;
    DIMTXSTY: string;
    DIMLDRBLK: string;
    DIMBLK: string;
    DIMBLK1: string;
    DIMBLK2: string;
    DIMLWD: number;
    DIMLWE: number;
}

export default class DxfDimStyleTableParser extends DxfTableParser<DimStyleRecord, true> {

    constructor() {
        super(true)
    }
    parse(tokenizer: Tokenizer) {
        tokenizer.advance(2);
        while (this.condition(tokenizer)) {
            if (this.commons) this.parseCommons(tokenizer, 'DIMSTYLE');
            this.parseRecords(tokenizer, 'DIMSTYLE', DimStyleRecordSpec);
        }
    }

    objectify() {
        return {
            dimStyle: this.table,
        };
    }

    static match(tokenizer: Tokenizer) {
        return tokenizer.type('DIMSTYLE', entity('TABLE'));
    }
}