import { XBBox, bbox, point } from "../../src";

describe("XBBox class", () => {
  it("should bbox of a line", () => {
    const _bbox = bbox(point(), point(10, 10, 10));
    expect(XBBox.line(point(), point(10, 10, 10))).toEqual(_bbox);
    expect(XBBox.line(point(10, 10, 10), point())).toEqual(_bbox);
  });
});
