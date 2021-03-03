import View from "./Records/View.js";
import Tag from "../../../Internals/Tag.js";
import Standard from "../../../Internals/Standard.js";

export default class ViewTable extends Standard {
    get views(): View[] {
        return this._views;
    }
    private _views: View[] = [];
    public constructor() {
        super();
    }

    public addView() {
        this._views.push(new View());
    }
    public tags(): Tag[] {
        let tags: Tag[] = [];
        tags.push(new Tag(0, 'TABLE'));
        tags.push(new Tag(2, 'VIEW'));
        const handle: string = this.handle();
        tags.push(new Tag(5, handle));
        tags.push(new Tag(330, 0));
        tags.push(new Tag(100, 'AcDbSymbolTable'));
        tags.push(new Tag(70, 0));
        this.views.forEach((view) => {
            tags = tags.concat(view.tags());
        });
        tags.push(new Tag(0, 'ENDTAB'));
        return tags;
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return str += tag.stringify();
        }, '');
    }
};
