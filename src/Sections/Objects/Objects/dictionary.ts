import TagsManager from "../../../Internals/TagsManager.js";

export default class Dictionary extends TagsManager{
    get name(): string {
        return this._name;
    }
    private readonly _name: string = '';
    public constructor(name: string = '') {
        super();
        this._name = name;

        this.addTag(0, 'DICTIONARY');
        const handle1: string = this.handle();
        const handle2: string = this.handle();
        this.addTag(5, handle1);
        this.addTag(330, '0');
        this.addTag(100, 'AcDbDictionary');
        this.addTag(281, 1);
        this.addTag(3, this.name);
        this.addTag(350, handle2);

        this.addTag(0, 'DICTIONARY');
        this.addTag(5, handle2);
        this.addTag(330, handle1);
        this.addTag(100, 'AcDbDictionary');
        this.addTag(281, 1);
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return `${str}${tag.stringify()}`;
        }, '');
    }
};
