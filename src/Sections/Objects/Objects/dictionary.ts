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
            ...this.makeEntityType('DICTIONARY'),
            ...this.makeHandle(this.handle),
            ...this.makeStandard([[330, 0]]),
            ...this.makeSubclassMarker('AcDbDictionary'),
            ...this.makeStandard([[281, 1]]),
            ...this.makeName(this.dictionaryName, 3),
            ...this.makeStandard([[350, this._dictionaryEntryHandle]]),
            ...this.makeEntityType('DICTIONARY'),
            ...this.makeHandle(this._dictionaryEntryHandle),
            ...this.makeStandard([[330, this.handle]]),
            ...this.makeSubclassMarker('AcDbDictionary'),
            ...this.makeStandard([[281, 1]]),
        ];
    }
};
