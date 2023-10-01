import { ArcDimension, ArcDimensionOptions } from "@/entities";
import { Seeder, TagsManager, point } from "@/utils";

describe("ArcDimension class", () => {
  it("should create a line entity", () => {
    const options: ArcDimensionOptions = {
      center: point(),
      startPoint: point(10),
      endPoint: point(0, 10),
      seeder: new Seeder(),
    };
    const arc = new ArcDimension(options);
    const mg = new TagsManager();
    arc.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
