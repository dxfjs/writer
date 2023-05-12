import { XHandle, XLine, XTagsManager, point } from "../../src";

describe("XLine class", () => {
  it("should create a line entity", () => {
    const line = new XLine(
      {
        start: point(),
        end: point(100, 100),
      },
      new XHandle()
    );
    const mg = new XTagsManager();
    line.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
