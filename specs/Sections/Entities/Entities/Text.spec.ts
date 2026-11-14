import { Text } from "EntitiesSection/Entities/Text";
import { Dxfier } from "Internals/Dxfier";
import { point3d } from "Internals/Helpers";
import { describe, expect, it } from "vitest";

function dxfied(value: string) {
  const dx = new Dxfier();
  new Text(point3d(5, 5, 0), 1, value).dxfy(dx);
  return dx;
}

function valuesOf(dx: Dxfier, code: number) {
  return dx.lines.filter((_, i) => i % 2 === 1 && dx.lines[i - 1] === code);
}

describe("Text", () => {
  it.each([
    ["\n", "a line feed"],
    ["\r\n", "a carriage return and a line feed"],
    ["\r", "a carriage return"],
  ])("should write %j in the value as a space.", (lineBreak) => {
    const dx = dxfied(`line1${lineBreak}line2`);
    expect(valuesOf(dx, 1)).toEqual(["line1 line2"]);
  });

  it("should write one line for each group code and each value.", () => {
    const dx = dxfied("line1\nline2");
    expect(dx.stringify().split("\n").length).toBe(dx.lines.length);
  });

  it("should write a value with no line break as it is.", () => {
    const dx = dxfied("%%c50 line1");
    expect(valuesOf(dx, 1)).toEqual(["%%c50 line1"]);
  });
});
