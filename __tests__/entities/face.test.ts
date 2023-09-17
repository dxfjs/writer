import { Face, InvisibleEdge } from "@/entities";
import { Handle, TagsManager, point } from "@/utils";

describe("Face class", () => {
  it("should cover the face entity", () => {
    const mg = new TagsManager();
    const handle = new Handle();
    const face1 = new Face(
      {
        first: point(),
        second: point(10),
        third: point(10, 10),
        fourth: point(0, 10),
      },
      handle
    );
    face1.tagify(mg);
    const face2 = new Face(
      {
        first: point(0, 0, 10),
        second: point(10, 0, 10),
        third: point(10, 10, 10),
      },
      handle
    );
    face2.tagify(mg);

    const face3 = new Face(
      {
        first: point(0, 0, 5),
        second: point(10, 0, 5),
        third: point(10, 10, 5),
        fourth: point(0, 10, 5),
        flags: InvisibleEdge.Third,
      },
      handle
    );
    face3.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
