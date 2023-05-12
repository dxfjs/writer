import { XBlocks, XEntities, XHandle, XTagsManager } from "../../src";

describe("XEntities class", () => {
  it("should create an empty entities section", () => {
    const entities = new XEntities(new XBlocks(new XHandle()));
    const mg = new XTagsManager();
    entities.tagify(mg);
    expect(mg.stringify()).toBe("0\nSECTION\n2\nENTITIES\n0\nENDSEC");
  });
});
