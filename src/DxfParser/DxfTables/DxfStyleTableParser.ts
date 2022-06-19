import { StyleRecordSpec } from './DxfTablesSpecifications';
import DxfTableParser from './DxfTableParser';
import { RecordCommons } from './DxfTablesParser';
import Tokenizer, { entity } from '../Tokenizer';

export interface StyleRecord extends RecordCommons {
    name: string;
    flags: number;
    textHeight: number;
    widthFactor: number;
    obliqueAngle: number;
    textGenerationFlags: number;
    lastHeight: number;
    primaryFontFile: string;
    bigFontFile: string;
    trueTypeFont: string;
}

export default class DxfStyleTableParser extends DxfTableParser<StyleRecord, false> {
    parse(tokenizer: Tokenizer) {
        tokenizer.advance(2);
        while (this.condition(tokenizer)) {
            if (this.commons) this.parseCommons(tokenizer, 'STYLE');
            this.parseRecords(tokenizer, 'STYLE', StyleRecordSpec);
        }
    }

    objectify() {
        return {
            style: this.table,
        };
    }

    static match(tokenizer: Tokenizer) {
        return tokenizer.type('STYLE', entity('TABLE'));
    }
}
