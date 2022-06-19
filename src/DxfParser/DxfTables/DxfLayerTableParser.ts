import { LayerRecordSpec } from './DxfTablesSpecifications';
import DxfTableParser from './DxfTableParser';
import { RecordCommons } from './DxfTablesParser';
import Tokenizer, { entity } from '../Tokenizer';

export interface LayerRecord extends RecordCommons {
    name: string;
    flags: number;
    color: number;
    lineType: string;
    plottingFlag: number;
    lineweight: number;
    plotStyleNameObject: string;
    materialObject: string;
}

export default class DxfLayerTableParser extends DxfTableParser<LayerRecord> {
    parse(tokenizer: Tokenizer) {
        tokenizer.advance(2);
        while (this.condition(tokenizer)) {
            if (this.commons) this.parseCommons(tokenizer, 'LAYER');
            this.parseRecords(tokenizer, 'LAYER', LayerRecordSpec);
        }
    }

    objectify() {
        return {
            layer: this.table,
        };
    }

    static match(tokenizer: Tokenizer) {
        return tokenizer.type('LAYER', entity('TABLE'));
    }
}
