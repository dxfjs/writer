import Table        from "../Table";
import Style        from "./Records/Style";
import Tag          from "../../../Internals/Tag";

export default class StyleTable extends Table {
    get styles(): Style[] {
        return this._styles;
    }
    private _styles: Style[] = [];
    public constructor() {
        super('STYLE');
    }
    public addStyle(name: string) {
        this._styles.push(new Style(name));
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...super.tags());
        this.styles.forEach((style) => {
            style.handleToOwner = this.handle;
            tags = tags.concat(style.tags());
        });
        tags.push(...this.entityType('ENDTAB'));
        return tags;
    }
}
