import Tag from "./Tag.js";
import Standard from "./Standard.js";

export default class TagsManager extends Standard{
    public tags(): Tag[] {
        return this._tags;
    }
    private _tags: Tag[] = [];

    public addTag(group_code: number, value: number | string) {
        this._tags.push(new Tag(group_code, value));
    }
}