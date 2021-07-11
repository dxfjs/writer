import Table        from "../Table";
import View         from "./Records/View";
import Tag          from "../../../Internals/Tag";

export default class ViewTable extends Table {
    get views(): View[] {
        return this._views;
    }
    private _views: View[] = [];
    public constructor() {
        super('VIEW');
    }

    public addView() {
        this._views.push(new View());
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(...super.tags());
        this.views.forEach((view) => {
            tags = tags.concat(view.tags());
        });
        tags.push(...this.makeEntityType('ENDTAB'));
        return tags;
    }
};
