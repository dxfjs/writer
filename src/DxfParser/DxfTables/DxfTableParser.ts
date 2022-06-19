import { TableCommonsSpec } from './DxfTablesSpecifications';
import { handle, RecordCommons, TableCommons } from './DxfTablesParser';
import Tokenizer, { entity, last, SpecificationMap } from '../Tokenizer';

export default class DxfTableParser<Record extends RecordCommons, Multi = false> {
    protected commons: boolean;
    readonly table: TableCommons<Partial<Record>, Multi>;

    constructor(multipleSubclassMarkers = false) {
        this.commons = true;
        this.table = {
            records: [] as Partial<Record>[],
        } as TableCommons<Partial<Record>, Multi>;
        if (multipleSubclassMarkers) {
            (this.table['subclassMarker'] as string[]) = [];
        }
    }

    protected condition(tokenizer: Tokenizer) {
        return (
            tokenizer.hasNext() &&
            tokenizer.exceptSectionOrEof() &&
            tokenizer.exceptTable()
        );
    }

    protected parseCommons(tokenizer: Tokenizer, name: string) {
        while (this.condition(tokenizer) && !tokenizer.is(entity(name))) {
            handle(this.table, TableCommonsSpec, tokenizer.next()!);
        }
        this.commons = false;
    }

    protected parseRecords(
        tokenizer: Tokenizer,
        name: string,
        spec: SpecificationMap
    ) {
        const records = this.table.records;
        if (tokenizer.is(entity(name))) {
            records.push({
                subclassMarker: [] as string[],
            } as Record);
            tokenizer.next();
        }
        const record = last(records);
        if (record) handle(record, spec, tokenizer.next()!);
        else throw `Unexpected group code at line ${tokenizer.cline}!`;
    }
}
