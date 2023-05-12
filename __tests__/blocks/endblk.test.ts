import { XEndBlk, XHandle, XTagsManager } from "../../src";

describe("XEndBlk class", () => {
  it("should create an endblk instance", () => {
    const block = new XEndBlk(new XHandle());
    block.addAppDefined("ACAD_REACTORS");
    const mg = new XTagsManager();
    block.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });

  it("should create defined application", () => {
    const block = new XEndBlk(new XHandle());
    const reactors = block.addAppDefined("ACAD_REACTORS");
    expect(reactors.name).toBe("ACAD_REACTORS");
    const test = block.addAppDefined("ACAD_REACTORS");
    expect(test).toBe(reactors);
  });
});
