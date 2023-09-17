import { ArcDimension, ArcDimensionOptions } from "@/entities";
import { Handle, TagsManager, point } from "@/utils";

describe("ArcDimension class", () => {
  it("should create a line entity", () => {
    const options: ArcDimensionOptions = {
      center: point(),
      startPoint: point(10),
      endPoint: point(0, 10),
    };
    const arc = new ArcDimension(options, new Handle());
    const mg = new TagsManager();
    arc.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
