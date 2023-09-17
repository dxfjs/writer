import { LinePrimitive } from "@/helpers";
import { Writer } from "@/writer";
import { point } from "@/utils";

describe("LinePrimitive class", () => {
  it("should cover all code", () => {
    const line = new LinePrimitive(point(), point(100));

    const writer1 = new Writer();
    line.write(writer1.document.modelSpace);

    const writer2 = new Writer();
    writer2.document.modelSpace.addLine({
      start: point(),
      end: point(100),
    });

    expect(writer1.stringify()).toBe(writer2.stringify());
  });
});
