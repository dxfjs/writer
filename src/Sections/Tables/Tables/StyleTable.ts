import Style        from "./Records/Style.js";
import Tag          from "../../../Internals/Tag.js";
import DXFManager   from "../../../Internals/DXFManager.js";

export default class StyleTable extends DXFManager {
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
        tags.push(new Tag(5, this.handle));
        tags.push(new Tag(330, 0));
        tags.push(new Tag(100, 'AcDbSymbolTable'));
        tags.push(new Tag(70, 3));
        this.styles.forEach((style) => {
            style.handleToOwner = this.handle;
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
