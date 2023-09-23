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
});
