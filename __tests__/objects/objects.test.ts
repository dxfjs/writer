import { Objects, Seeder, TagsManager } from "@/index";

describe("Objects class", () => {
  it("should create an objects section", () => {
    const objects = new Objects({ seeder: new Seeder() });
    const mg = new TagsManager();
    objects.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
