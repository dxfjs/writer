import { Line, Seeder, TagsManager, point } from "@/index";

describe("Line class", () => {
  it("should create a line entity", () => {
    const line = new Line({
      start: point(),
      end: point(100, 100),
      seeder: new Seeder(),
    });
    const mg = new TagsManager();
    line.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
