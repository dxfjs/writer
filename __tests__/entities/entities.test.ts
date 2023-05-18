import { XBlocks, XEntities, XHandle, XTables, XTagsManager } from "../../src";

describe("XEntities class", () => {
  const handle = new XHandle();
  it("should create an empty entities section", () => {
    const entities = new XEntities(new XBlocks(new XTables(handle), handle));
    const mg = new XTagsManager();
    entities.tagify(mg);
    expect(mg.stringify()).toBe("0\nSECTION\n2\nENTITIES\n0\nENDSEC");
  });
});
