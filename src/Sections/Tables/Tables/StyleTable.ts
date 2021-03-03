import Tag from "../../../Internals/Tag.js";
import Style from "./Records/Style.js";
import Standard from "../../../Internals/Standard.js";

export default class StyleTable extends Standard {
    get styles(): Style[] {
        return this._styles;
    }
    private _styles: Style[] = [];
    public constructor() {
        super();
    }
    public addStyle(name: string) {
        this._styles.push(new Style(name));
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'TABLE'));
        tags.push(new Tag(2, 'STYLE'));
        const handle: string = this.handle();
        tags.push(new Tag(5, handle));
        tags.push(new Tag(330, 0));
        tags.push(new Tag(100, 'AcDbSymbolTable'));
        tags.push(new Tag(70, 3));
        this.styles.forEach((style) => {
            style.handleToOwner = handle;
            tags = tags.concat(style.tags());
        });
        tags.push(new Tag(0, 'ENDTAB'));
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }
}
