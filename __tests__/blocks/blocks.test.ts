import { XBlocks, XHandle, XTables, XTagsManager } from "../../src";

describe("XBlocks class", () => {
  const handle = new XHandle();
  it("should create a blocks section", () => {
    const blocks = new XBlocks(new XTables(handle), handle);
    const mg = new XTagsManager();
    blocks.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
    expect(blocks.paperSpace.isPaperSpace).toBeTruthy();
  });
});
