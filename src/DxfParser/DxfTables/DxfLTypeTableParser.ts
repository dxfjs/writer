import { LTypeElementSpec, LTypeRecordSpec } from './DxfTablesSpecifications';
import DxfTableParser from './DxfTableParser';
import { handle, RecordCommons } from './DxfTablesParser';
import Tokenizer, { entity, last, token_t } from '../Tokenizer';

export interface LTypeElement {
    length: number;
    complexType: number;
    shapeNumber: number;
    styleObject: string;
    scale: number;
    rotation: number;
    offsetX: number;
    offsetY: number;
    text: string;
}

export interface LTypeRecord extends RecordCommons {
    name: string;
    flags: number;
    descriptive: string;
    alignmentCode: number;
    numberOfElements: number;
    patternLength: number;
    elements: LTypeElement[];
}

function element(token: token_t) {
    return token.code === 49;
}

export default class DxfLTypeTableParser extends DxfTableParser<LTypeRecord, false> {
    constructor() {
        super();
    }

    private parseElements(tokenizer: Tokenizer) {
        while (tokenizer.has(LTypeElementSpec)) {
            const records = this.table.records;
            const record = last(records);
            const error = `Unexpected group code at line ${tokenizer.cline}!`;
            if (record) {
                if (tokenizer.is(element)) {
                    if (!record.elements) record.elements = [];
                    record.elements.push({} as LTypeElement);
                }
                const elements = record.elements;
                if (elements) {
                    const el = last(elements);
                    if (el) handle(el, LTypeElementSpec, tokenizer.next()!);
                    else throw new Error(error);
                } else throw new Error(error);
            } else throw new Error(error);
        }
    }

    parse(tokenizer: Tokenizer) {
        tokenizer.advance(2);
        while (this.condition(tokenizer)) {
            if (this.commons) this.parseCommons(tokenizer, 'LTYPE');
            this.parseRecords(tokenizer, 'LTYPE', LTypeRecordSpec);
            this.parseElements(tokenizer);
        }
    }

    objectify() {
        return {
            lType: this.table,
        };
    }

    static match(tokenizer: Tokenizer) {
        return tokenizer.type('LTYPE', entity('TABLE'));
    }
}
