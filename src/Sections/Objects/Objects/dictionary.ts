import Tag                      from "../../../Internals/Tag";
import DXFManager               from "../../../Internals/DXFManager";

export default class Dictionary extends DXFManager {
    get dictionaryName(): string {
        return this._dictionaryName;
    }
    private readonly _dictionaryName: string = '';
    private readonly _dictionaryEntryHandle: string;
    public constructor(name: string = '') {
        super();
        this._dictionaryName = name;
        this._dictionaryEntryHandle = this.handleSeed();
    }

    tags(): Tag[] {
        return [
            ...this.entityType('DICTIONARY'),
            ...this.hand(this.handle),
            ...this.standard([[330, 0]]),
            ...this.subclassMarker('AcDbDictionary'),
            ...this.standard([[281, 1]]),
            ...this.name(this.dictionaryName, 3),
            ...this.standard([[350, this._dictionaryEntryHandle]]),
            ...this.entityType('DICTIONARY'),
            ...this.hand(this._dictionaryEntryHandle),
            ...this.standard([[330, this.handle]]),
            ...this.subclassMarker('AcDbDictionary'),
            ...this.standard([[281, 1]]),
        ];
    }
};
