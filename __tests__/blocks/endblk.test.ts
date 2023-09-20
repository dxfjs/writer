import { EndBlk, Handle, TagsManager } from "@/index";

describe("EndBlk class", () => {
  it("should create an endblk instance", () => {
    const block = new EndBlk(new Handle());
    block.addAppDefined("ACAD_REACTORS");
    const mg = new TagsManager();
    block.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });

  it("should create defined application", () => {
    const block = new EndBlk(new Handle());
    const reactors = block.addAppDefined("ACAD_REACTORS");
    expect(reactors.name).toBe("ACAD_REACTORS");
    const test = block.addAppDefined("ACAD_REACTORS");
    expect(test).toBe(reactors);
  });
});
