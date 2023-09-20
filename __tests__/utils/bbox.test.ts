import { BBox, bbox, point } from "@/index";

describe("BBox class", () => {
  it("should bbox of a line", () => {
    const _bbox = bbox(point(), point(10, 10, 10));
    expect(BBox.line(point(), point(10, 10, 10))).toEqual(_bbox);
    expect(BBox.line(point(10, 10, 10), point())).toEqual(_bbox);
  });
});
