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
