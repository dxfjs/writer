import { AppDefined, TagsManager } from "@/index";

describe("AppDefined class", () => {
  it("should create an empty application", () => {
    const application = new AppDefined("ACAD_REACTORS");
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe("");
  });

  it("should be able to add a tag value", () => {
    const application = new AppDefined("ACAD_REACTORS");
    application.add(330, "A");
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe("102\n{ACAD_REACTORS\n330\nA\n102\n}");
  });

  it("should be able to clear the tag values", () => {
    const application = new AppDefined("ACAD_REACTORS");
    application.add(330, "A");
    application.clear();
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe("");
  });
});
