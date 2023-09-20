import { Blocks, Handle, Tables, TagsManager } from "@/index";

describe("Blocks class", () => {
  const handle = new Handle();
  it("should create a blocks section", () => {
    const blocks = new Blocks(new Tables(handle), handle);
    const mg = new TagsManager();
    blocks.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
    expect(blocks.paperSpace.isPaperSpace).toBeTruthy();
  });
});
