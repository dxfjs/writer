import DxfBlocksParser from './DxfBlocksParser';
import DxfClassesParser from './DxfClassesParser';
import DxfEntitiesParser from './DxfEntitiesParser';
import DxfHeaderParser from './DxfHeader/DxfHeaderParser';
import DxfObjectsParser from './DxfObjectsParser';
import DxfTablesParser from './DxfTables/DxfTablesParser';
import Tokenizer, { endsec, eof, section } from './Tokenizer';

export default class Parser {
    header: DxfHeaderParser;
    classes: DxfClassesParser;
    tables: DxfTablesParser;
    blocks: DxfBlocksParser;
    entities: DxfEntitiesParser;
    objects: DxfObjectsParser;
    constructor() {
        this.header = new DxfHeaderParser();
        this.classes = new DxfClassesParser();
        this.tables = new DxfTablesParser();
        this.blocks = new DxfBlocksParser();
        this.entities = new DxfEntitiesParser();
        this.objects = new DxfObjectsParser();
    }

    parse(content: string) {
        const tokenizer = new Tokenizer(content);
        if (tokenizer.error) throw new Error(tokenizer.error);

        while (true) {
            if (tokenizer.is(eof)) return;
            DxfHeaderParser.match(tokenizer) && this.header.parse(tokenizer);
            DxfClassesParser.match(tokenizer) && this.classes.parse(tokenizer);
            DxfTablesParser.match(tokenizer) && this.tables.parse(tokenizer);
            DxfBlocksParser.match(tokenizer) && this.blocks.parse(tokenizer);
            DxfEntitiesParser.match(tokenizer) && this.entities.parse(tokenizer);
            DxfObjectsParser.match(tokenizer) && this.objects.parse(tokenizer);

            if (tokenizer.is(section)) {
                tokenizer.next();
                throw new Error(`Unexpected token at line ${tokenizer.cline}`);
            }
            if (tokenizer.is(endsec)) tokenizer.next();
            else throw new Error(`Expected ENDSEC at line ${tokenizer.cline}`);
            if (!tokenizer.hasNext())
                throw new Error(`Expected EOF! at line ${tokenizer.cline}`);
        }
    }

    objectify() {
        return {
            ...this.header.objectify(),
            ...this.tables.objectify(),
        }
    }
}
