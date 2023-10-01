import { Blocks, Seeder, Tables, TagsManager } from "@/index";

describe("Blocks class", () => {
  const seeder = new Seeder();
  it("should create a blocks section", () => {
    const options = { seeder };
    const blocks = new Blocks({
      ...options,
      tables: new Tables(options),
    });
    const mg = new TagsManager();
    blocks.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
    expect(blocks.paperSpace.isPaperSpace).toBeTruthy();
  });
});
