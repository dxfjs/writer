import { EntitiesManager, XHandle, XTagsManager, point } from "../../src";

describe("EntitiesManager class", () => {
  it("should create an empty varaible", () => {
    const mg = new EntitiesManager(new XHandle());
    const m = new XTagsManager();
    mg.tagify(m);
    expect(m.stringify()).toBe("");
  });

  it("should be able to add a line entity", () => {
    const mg = new EntitiesManager(new XHandle());
    mg.addLine({
      start: point(),
      end: point(100, 100),
    });
    const m = new XTagsManager();
    mg.tagify(m);
    expect(m.stringify()).toMatchFileSnapshot("__snapshots__line.test.ts.snap");
  });
});
