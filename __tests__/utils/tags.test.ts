import { TagsManager, point, point2d } from "@/index";

describe("TagsManager class", () => {
  it("should create an empty mg", () => {
    const mg = new TagsManager();
    expect(mg.stringify()).toBe("");
  });

  it("should clear tag values", () => {
    const mg = new TagsManager();
    mg.add(0, "SECTION");
    mg.add(0);
    mg.clear();
    expect(mg.stringify()).toBe("");
  });

  it("should push tag values", () => {
    const mg = new TagsManager();
    mg.add(0, "SECTION");
    mg.add(0);
    expect(mg.stringify()).toBe("0\nSECTION");
  });

  it.each([
    "\n",
    "\r\n",
    "\r",
  ])("should write a string value holding %j on one line", (lineBreak) => {
    const mg = new TagsManager();
    mg.add(8, `walls${lineBreak}north`);
    mg.add(62, 1);
    expect(mg.stringify()).toBe("8\nwalls north\n62\n1");
  });

  it("should write each line break of a string value as one space", () => {
    const mg = new TagsManager();
    mg.add(8, "a\n\nb\r\nc");
    expect(mg.stringify()).toBe("8\na  b c");
  });

  it("should leave a value with no line break as it is", () => {
    const mg = new TagsManager();
    mg.add(8, "walls north");
    mg.add(40, 1.5);
    expect(mg.lines).toEqual([8, "walls north", 40, 1.5]);
  });

  it("should start a section", () => {
    const mg = new TagsManager();
    mg.sectionStart("HEADER");
    expect(mg.stringify()).toBe("0\nSECTION\n2\nHEADER");
  });

  it("should end a section", () => {
    const mg = new TagsManager();
    mg.sectionStart("HEADER");
    mg.sectionEnd();
    expect(mg.stringify()).toBe("0\nSECTION\n2\nHEADER\n0\nENDSEC");
  });

  it("should add 2d point values", () => {
    const mg = new TagsManager();
    mg.point2d(point2d());
    expect(mg.stringify()).toBe("10\n0\n20\n0");
    mg.clear();
    mg.point2d(point2d(), 1);
    expect(mg.stringify()).toBe("11\n0\n21\n0");
    mg.clear();
    mg.point2d();
    expect(mg.stringify()).toBe("");
  });

  it("should add 3d point values", () => {
    const mg = new TagsManager();
    mg.point(point());
    expect(mg.stringify()).toBe("10\n0\n20\n0\n30\n0");
    mg.clear();
    mg.point(point(), 1);
    expect(mg.stringify()).toBe("11\n0\n21\n0\n31\n0");
    mg.clear();
    mg.point();
    expect(mg.stringify()).toBe("");
  });
});
