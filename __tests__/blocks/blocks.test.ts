import { XBlocks, XHandle, XTagsManager } from "../../src";

describe("XBlocks class", () => {
  it("should create a blocks section", () => {
    const blocks = new XBlocks(new XHandle());
    const mg = new XTagsManager();
    blocks.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
