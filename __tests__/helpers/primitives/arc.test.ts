import { ArcPrimitive } from "@/helpers";
import { Writer } from "@/writer";
import { point2d } from "@/utils";

describe("ArcPrimitive class", () => {
  it("should create an arc from 3 points", () => {
    const result = new ArcPrimitive({
      center: point2d(),
      radius: 100,
      startAngle: 0,
      endAngle: 180,
    });

    const from3Points = ArcPrimitive.from3Points;

    const arc1 = from3Points(point2d(100), point2d(0, 100), point2d(-100));
    const arc2 = from3Points(point2d(-100), point2d(0, 100), point2d(100));
    const arc3 = from3Points(point2d(100), point2d(), point2d(-100));

    expect(arc1).toEqual(result.cw.ccw.ccw);
    expect(arc2).toEqual(result.ccw.cw.cw);
    expect(arc3).toBeNull();

    const writer1 = new Writer();
    arc1?.write(writer1.document.modelSpace);

    const writer2 = new Writer();
    arc2?.write(writer2.document.modelSpace);

    expect(writer1.stringify()).toBe(writer2.stringify());
  });
});
