import { Block, BlockRecordEntry, Handle, TagsManager } from "@/index";

describe("Block class", () => {
  const handle = new Handle();
  const options = { name: "*Model_Space" };
  it("should create an empty block", () => {
    const block = new Block(
      options,
      handle,
      new BlockRecordEntry(options, handle)
    );
    block.addAppDefined("ACAD_REACTORS");
    const mg = new TagsManager();
    block.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
    mg.clear();
    block.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });

  it("should create defined application", () => {
    const block = new Block(
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
