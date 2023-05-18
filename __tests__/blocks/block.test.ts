import { BlockRecordEntry, XBlock, XHandle, XTagsManager } from "../../src";

describe("XBlock class", () => {
  const handle = new XHandle();
  const options = { name: "*Model_Space" };
  it("should create an empty block", () => {
    const block = new XBlock(
      options,
      handle,
      new BlockRecordEntry(options, handle)
    );
    block.addAppDefined("ACAD_REACTORS");
    const mg = new XTagsManager();
    block.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
    mg.clear();
    block.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });

  it("should create defined application", () => {
    const block = new XBlock(
      options,
      handle,
      new BlockRecordEntry(options, handle)
    );
    const reactors = block.addAppDefined("ACAD_REACTORS");
    expect(reactors.name).toBe("ACAD_REACTORS");
    const test = block.addAppDefined("ACAD_REACTORS");
    expect(test).toBe(reactors);
  });
});
