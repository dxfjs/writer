import { MText, point, Seeder, TagsManager } from "@/index";

function tagified(value: string) {
  const mg = new TagsManager();
  const mtext = new MText({
    insertionPoint: point(5, 5),
    height: 1,
    value,
    seeder: new Seeder(),
  });
  mtext.tagify(mg);
  return mg;
}

function valuesOf(mg: TagsManager, code: number) {
  return mg.lines.filter((_, i) => i % 2 === 1 && mg.lines[i - 1] === code);
}

describe("MText class", () => {
  it.each(["\n", "\r\n", "\r"])(
    "should write %j in the value as the paragraph code \\P",
    (lineBreak) => {
      const mg = tagified(`line1${lineBreak}line2`);
      expect(valuesOf(mg, 1)).toEqual(["line1\\Pline2"]);
    },
  );

  it("should write one line for each group code and each value", () => {
    const mg = tagified("line1\nline2\r\nline3");
    expect(mg.stringify().split("\n").length).toBe(mg.lines.length);
  });

  it("should write a value with no line break as it is", () => {
    const mg = tagified("{\\fArial|b1;line1}\\Pline2");
    expect(valuesOf(mg, 1)).toEqual(["{\\fArial|b1;line1}\\Pline2"]);
  });
});
