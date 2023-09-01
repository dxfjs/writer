import { Handle, Objects, TagsManager } from "../../src";

describe("Objects class", () => {
  it("should create an objects section", () => {
    const objects = new Objects(new Handle());
    const mg = new TagsManager();
    objects.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
