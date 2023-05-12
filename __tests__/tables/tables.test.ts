import { XHandle, XTables, XTagsManager } from "../../src";

describe("XTables class", () => {
  it("should create a tables section", () => {
    const tables = new XTables(new XHandle());
    tables.addLType({
      name: "DASHDOT",
      descriptive: "__ . ",
      elements: [1, 1, -1, 0, -1],
    });
    const mg = new XTagsManager();
    tables.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });

  it("should add paper spaces", () => {
    const tables = new XTables(new XHandle());
    expect(tables.addPaperSpace().name).toBe("*Paper_Space0");
    expect(tables.addPaperSpace().name).toBe("*Paper_Space1");
    expect(tables.addPaperSpace().name).toBe("*Paper_Space2");
  });
});
