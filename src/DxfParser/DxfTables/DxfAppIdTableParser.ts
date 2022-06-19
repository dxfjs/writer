import { AppIdRecordSpec } from './DxfTablesSpecifications';
import DxfTableParser from './DxfTableParser';
import { RecordCommons } from './DxfTablesParser';
import Tokenizer, { entity } from '../Tokenizer';

export interface AppIdRecord extends RecordCommons {
    name: string;
    flags: number;
}

export default class DxfAppIdTableParser extends DxfTableParser<AppIdRecord> {
    parse(tokenizer: Tokenizer) {
        tokenizer.advance(2);
        while (this.condition(tokenizer)) {
            if (this.commons) this.parseCommons(tokenizer, 'APPID');
            this.parseRecords(tokenizer, 'APPID', AppIdRecordSpec);
        }
    }

    objectify() {
        return {
            appId: this.table,
        };
    }

    static match(tokenizer: Tokenizer) {
        return tokenizer.type('APPID', entity('TABLE'));
    }
}
