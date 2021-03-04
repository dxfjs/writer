import Tag                      from "../../../Internals/Tag.js";
import DXFManager               from "../../../Internals/DXFManager.js";
import DXFInterface             from "../../../Internals/Interfaces/DXFInterface.js";
import NameComponent            from "../../../Internals/Components/NameComponent.js";
import HandleComponent          from "../../../Internals/Components/HandleComponent.js";
import StandardComponent        from "../../../Internals/Components/StandardComponent.js";
import EntityTypeComponent      from "../../../Internals/Components/EntityTypeComponent.js";
import SubclassMarkerComponent  from "../../../Internals/Components/SubclassMarkerComponent.js";

export default class Dictionary extends DXFManager implements DXFInterface{
    get dictionaryName(): string {
        return this._dictionaryName;
    }
    private readonly _dictionaryName: string = '';
    private _secondHandle: string;
    public constructor(name: string = '') {
        super(DXFManager.version);
        this._dictionaryName = name;
        this._secondHandle = this.handleSeed();
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return `${str}${tag.stringify()}`;
        }, '');
    }

    tags(): Tag[] {
        return [
            ...new EntityTypeComponent('DICTIONARY').tags(),
            ...new HandleComponent(this.handle).tags(),
            ...new StandardComponent([[330, 0]]).tags(),
            ...new SubclassMarkerComponent('AcDbDictionary').tags(),
            ...new StandardComponent([[281, 1]]).tags(),
            ...new NameComponent(this.dictionaryName, 3).tags(),
            ...this.standard([[350, this._secondHandle]]).tags(),
            ...new EntityTypeComponent('DICTIONARY').tags(),
            ...this.hand(this._secondHandle).tags(),
            ...new StandardComponent([[330, this.handle]]).tags(),
            ...new SubclassMarkerComponent('AcDbDictionary').tags(),
            ...new StandardComponent([[281, 1]]).tags(),
        ];
    }
};
