import { Handle, Line, TagsManager, point } from "@/index";

describe("XLine class", () => {
  it("should create a line entity", () => {
    const line = new Line(
      {
        start: point(),
        end: point(100, 100),
      },
      new Handle()
    );
    const mg = new TagsManager();
    line.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
