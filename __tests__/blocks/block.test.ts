import { Block, BlockRecordEntry, Seeder, TagsManager } from "@/index";

describe("Block class", () => {
  const seeder = new Seeder();
  const options = { name: "*Model_Space", seeder };
  it("should create an empty block", () => {
    const block = new Block({
      ...options,
      blockRecord: new BlockRecordEntry(options),
    });
    block.addAppDefined("ACAD_REACTORS");
    const mg = new TagsManager();
    block.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
    mg.clear();
    block.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });

  it("should create defined application", () => {
    const block = new Block({
      ...options,
      blockRecord: new BlockRecordEntry(options),
    });
    const reactors = block.addAppDefined("ACAD_REACTORS");
    expect(reactors.name).toBe("ACAD_REACTORS");
    const test = block.addAppDefined("ACAD_REACTORS");
    expect(test).toBe(reactors);
  });
});
