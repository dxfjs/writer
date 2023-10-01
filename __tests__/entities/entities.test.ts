import { Blocks, Entities, Seeder, Tables, TagsManager } from "@/index";

describe("Entities class", () => {
  const seeder = new Seeder();
  it("should create an empty entities section", () => {
    const options = { seeder };
    const blocks = new Blocks({
      ...options,
      tables: new Tables(options),
    });
    const entities = new Entities({ ...options, blocks });
    const mg = new TagsManager();
    entities.tagify(mg);
    expect(mg.stringify()).toBe("0\nSECTION\n2\nENTITIES\n0\nENDSEC");
  });
});
