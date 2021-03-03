import Tag from "../Tag.js";
import DXFInterface from "../Interfaces/DXFInterface.js";

export default class StandardComponent implements DXFInterface {
    private _tags: Tag[] = [];
    public constructor(tagsArray: [number, number | string][]) {
        tagsArray.forEach((tag) => {
            this._tags.push(new Tag(tag[0], tag[1]));
        });
    }
    stringify(): string {
        return this._tags.reduce((str, tag) => {
            return `${str}${tag.stringify()}`;
        }, '');
    }
    tags(): Tag[] {
        return this._tags;
    }
};
