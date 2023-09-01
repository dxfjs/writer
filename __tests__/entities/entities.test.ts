import { Blocks, Entities, Handle, Tables, TagsManager } from "../../src";

describe("XEntities class", () => {
  const handle = new Handle();
  it("should create an empty entities section", () => {
    const entities = new Entities(new Blocks(new Tables(handle), handle));
    const mg = new TagsManager();
    entities.tagify(mg);
    expect(mg.stringify()).toBe("0\nSECTION\n2\nENTITIES\n0\nENDSEC");
  });
});
