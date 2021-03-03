import Tag from "../../Internals/Tag.js";

export default class Classes {
    public constructor() {
    }

    public tags(): Tag[] {
        let tags: Tag[] = [];
        return tags;
    }
    public stringify(): string {
        let str = '';
        str += new Tag(0, 'SECTION').stringify();
        str += new Tag(2, 'CLASSES').stringify();
        str += this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
        str += new Tag(0, 'ENDSEC').stringify();
        return str;
    }
};
