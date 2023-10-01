import {
  BlockRecordEntry,
  EntitiesManager,
  Seeder,
  TagsManager,
  point,
} from "@/index";

describe("EntitiesManager class", () => {
  const seeder = new Seeder();
  const blockRecord = new BlockRecordEntry({ name: "*Model_Space", seeder });
  it("should create an empty varaible", () => {
    const mg = new EntitiesManager({ blockRecord, seeder });
    const m = new TagsManager();
    mg.tagify(m);
    expect(m.stringify()).toBe("");
  });

  it("should be able to add a line entity", () => {
    const mg = new EntitiesManager({ blockRecord, seeder });
    mg.addLine({
      start: point(),
      end: point(100, 100),
    });
    const m = new TagsManager();
    mg.tagify(m);
    expect(m.stringify()).toMatchFileSnapshot("__snapshots__line.test.ts.snap");
  });
});
