import { point, Seeder, TagsManager, Text } from "@/index";

function tagified(value: string) {
  const mg = new TagsManager();
  const text = new Text({
    firstAlignmentPoint: point(5, 5),
    height: 1,
    value,
    seeder: new Seeder(),
  });
  text.tagify(mg);
  return mg;
}

function valuesOf(mg: TagsManager, code: number) {
  return mg.lines.filter((_, i) => i % 2 === 1 && mg.lines[i - 1] === code);
}

describe("Text class", () => {
  it.each(["\n", "\r\n", "\r"])(
    "should write %j in the value as a space",
    (lineBreak) => {
      const mg = tagified(`line1${lineBreak}line2`);
      expect(valuesOf(mg, 1)).toEqual(["line1 line2"]);
    },
  );

  it("should write one line for each group code and each value", () => {
    const mg = tagified("line1\nline2");
    expect(mg.stringify().split("\n").length).toBe(mg.lines.length);
  });

  it("should write a value with no line break as it is", () => {
    const mg = tagified("%%c50 line1");
    expect(valuesOf(mg, 1)).toEqual(["%%c50 line1"]);
  });
});
