import { BlockRecordSpec } from './DxfTablesSpecifications';
import DxfTableParser from './DxfTableParser';
import { RecordCommons } from './DxfTablesParser';
import Tokenizer, { entity } from '../Tokenizer';

export interface BlockRecord extends RecordCommons {
    name: string;
    layoutObject: string;
    insertionUnits: number;
    explodability: number;
    scalability: number;
}

export default class DxfBlockRecordTableParser extends DxfTableParser<BlockRecord> {
    parse(tokenizer: Tokenizer) {
        tokenizer.advance(2);
        while (this.condition(tokenizer)) {
            if (this.commons) this.parseCommons(tokenizer, 'BLOCK_RECORD');
            this.parseRecords(tokenizer, 'BLOCK_RECORD', BlockRecordSpec);
        }
    }

    objectify() {
        return {
            blockRecord: this.table,
        };
    }

    static match(tokenizer: Tokenizer) {
        return tokenizer.type('BLOCK_RECORD', entity('TABLE'));
    }
}
