import DxfAppIdTableParser from './DxfAppIdTableParser';
import DxfBlockRecordTableParser from './DxfBlockRecordTableParser';
import DxfDimStyleTableParser from './DxfDimStyleTableParser';
import DxfLayerTableParser from './DxfLayerTableParser';
import DxfLTypeTableParser from './DxfLTypeTableParser';
import DxfStyleTableParser from './DxfStyleTableParser';
import Tokenizer, { section, token_t } from '../Tokenizer';

type DxfObj = {
    [key: string]: any;
};

export function value(token: token_t) {
    if (
        (token.code >= 10 && token.code <= 59) ||
        (token.code >= 110 && token.code <= 149) ||
        (token.code >= 460 && token.code <= 469) ||
        (token.code >= 210 && token.code <= 239) ||
        (token.code >= 1010 && token.code <= 1059)
    )
        parseFloat(token.value);
    else if (
        (token.code >= 60 && token.code <= 99) ||
        (token.code >= 160 && token.code <= 179) ||
        (token.code >= 270 && token.code <= 289) ||
        (token.code >= 370 && token.code <= 389) ||
        (token.code >= 400 && token.code <= 409) ||
        (token.code >= 420 && token.code <= 429) ||
        (token.code >= 440 && token.code <= 459) ||
        (token.code >= 1060 && token.code <= 1071)
    )
        return parseInt(token.value);
    else if (token.code >= 290 && token.code <= 299)
        return Boolean(Number(token.value));
    return token.value;
}

export function handle(
    obj: DxfObj,
    mapped: Map<number, string>,
    token: token_t
) {
    if (mapped.has(token.code)) {
        const property = mapped.get(token.code)!;
        if (Array.isArray(obj[property])) {
            (obj[property] as any[]).push(token.value);
        } else {
            if (obj[property])
                throw Error(`Unexpected group code at line ${token.line}!`);
            obj[property] = value(token);
        }
    }
}

export interface TableCommons<T, Multi> {
    handle: string;
    ownerObject: string;
    subclassMarker: Multi extends true ? string[] : string;
    numberOfRecords: number;
    records: T[];
}

export interface RecordCommons {
    handle: string;
    ownerObject: string;
    subclassMarker: string[];
}

export default class DxfTablesParser {
    appId: DxfAppIdTableParser;
    blockRecord: DxfBlockRecordTableParser;
    layer: DxfLayerTableParser;
    dimStyle: DxfDimStyleTableParser;
    style: DxfStyleTableParser;
    lType: DxfLTypeTableParser;

    constructor() {
        this.appId = new DxfAppIdTableParser();
        this.blockRecord = new DxfBlockRecordTableParser();
        this.layer = new DxfLayerTableParser();
        this.dimStyle = new DxfDimStyleTableParser();
        this.style = new DxfStyleTableParser();
        this.lType = new DxfLTypeTableParser();
    }

    parse(tokenizer: Tokenizer) {
        tokenizer.advance(2);
        while (tokenizer.hasNext() && tokenizer.exceptSectionOrEof()) {
            if (DxfAppIdTableParser.match(tokenizer)) {
                this.appId.parse(tokenizer);
            } else if (DxfBlockRecordTableParser.match(tokenizer)) {
                this.blockRecord.parse(tokenizer);
            } else if (DxfLayerTableParser.match(tokenizer)) {
                this.layer.parse(tokenizer);
            } else if (DxfDimStyleTableParser.match(tokenizer)) {
                this.dimStyle.parse(tokenizer);
            } else if (DxfStyleTableParser.match(tokenizer)) {
                this.style.parse(tokenizer);
            } else if (DxfLTypeTableParser.match(tokenizer)) {
                this.lType.parse(tokenizer);
            } else tokenizer.next(); // TODO Handle ENDTAB
        }
    }

    objectify() {
        return {
            tables: {
                ...this.appId.objectify(),
                ...this.blockRecord.objectify(),
                ...this.layer.objectify(),
                ...this.dimStyle.objectify(),
                ...this.style.objectify(),
                ...this.lType.objectify(),
                view: {}, // TODO Not implemented!
                vport: {}, // TODO Not implemented!
            },
        };
    }

    static match(tokenizer: Tokenizer) {
        return tokenizer.type('TABLES', section);
    }
}
