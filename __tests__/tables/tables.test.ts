import { Handle, Tables, TagsManager } from "@/index";

describe("Tables class", () => {
  it("should create a tables section", () => {
    const tables = new Tables(new Handle());
    tables.addLType({
      name: "DASHDOT",
      descriptive: "__ . ",
      elements: [1, 1, -1, 0, -1],
    });
    const mg = new TagsManager();
    tables.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });

  it("should add paper spaces", () => {
    const tables = new Tables(new Handle());
    expect(tables.addPaperSpace().name).toBe("*Paper_Space0");
    expect(tables.addPaperSpace().name).toBe("*Paper_Space1");
    expect(tables.addPaperSpace().name).toBe("*Paper_Space2");
  });
});
