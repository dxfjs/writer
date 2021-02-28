import TagsManager from "../../../../Internals/TagsManager.js";

export default class View extends TagsManager {
    public constructor() {
        super();
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            return `${str}${tag.stringify()}`;
        }, '');
    }
}