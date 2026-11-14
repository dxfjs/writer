import { Dxfier } from "Internals/Dxfier";
import { describe, expect, it } from "vitest";

describe("Dxfier", () => {
  it.each([
    ["\n", "a line feed"],
    ["\r\n", "a carriage return and a line feed"],
    ["\r", "a carriage return"],
  ])("should write a string value holding %j on one line.", (lineBreak) => {
    const dx = new Dxfier();
    dx.push(8, `walls${lineBreak}north`);
    dx.push(62, 1);
    expect(dx.stringify()).toBe("8\nwalls north\n62\n1");
  });

  it("should write each line break of a string value as one space.", () => {
    const dx = new Dxfier();
    dx.push(8, "a\n\nb\r\nc");
    expect(dx.stringify()).toBe("8\na  b c");
  });

  it("should leave a value with no line break as it is.", () => {
    const dx = new Dxfier();
    dx.push(8, "walls north");
    dx.push(40, 1.5);
    expect(dx.lines).toEqual([8, "walls north", 40, 1.5]);
  });
});
