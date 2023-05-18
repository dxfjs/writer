import {
  BlockRecordEntry,
  EntitiesManager,
  XHandle,
  XTagsManager,
  point,
} from "../../src";

describe("EntitiesManager class", () => {
  const handle = new XHandle();
  const br = new BlockRecordEntry({ name: "*Model_Space" }, handle);
  it("should create an empty varaible", () => {
    const mg = new EntitiesManager(br, handle);
    const m = new XTagsManager();
    mg.tagify(m);
    expect(m.stringify()).toBe("");
  });

  it("should be able to add a line entity", () => {
    const mg = new EntitiesManager(br, handle);
    mg.addLine({
      start: point(),
      end: point(100, 100),
    });
    const m = new XTagsManager();
    mg.tagify(m);
    expect(m.stringify()).toMatchFileSnapshot("__snapshots__line.test.ts.snap");
  });
});
