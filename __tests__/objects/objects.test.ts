import { Handle, Objects, TagsManager } from "@/index";

describe("Objects class", () => {
  it("should create an objects section", () => {
    const objects = new Objects(new Handle());
    const mg = new TagsManager();
    objects.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
