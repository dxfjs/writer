import { DxfClassesSection } from "ClassesSection/DxfClassesSection";
import { DxfWriter } from "DxfWriter";
import { point3d } from "Internals";
import { Dxfier } from "Internals/Dxfier";
import { describe, expect, it } from "vitest";

const stringify = (classes: DxfClassesSection) => {
  const dx = new Dxfier();
  classes.dxfy(dx);
  return dx.stringify();
};

describe("Classes", () => {
  it("writes an empty CLASSES section for the types AutoCAD knows", () => {
    const classes = new DxfClassesSection();
    classes.collect(["LINE", "DICTIONARY", "LWPOLYLINE", "HATCH"]);
    expect(classes.classes).toHaveLength(0);
    expect(stringify(classes)).toBe("0\nSECTION\n2\nCLASSES\n0\nENDSEC");
  });

  it("keeps one record per application-defined type, counting its instances", () => {
    const classes = new DxfClassesSection();
    classes.collect(["IMAGE", "LINE", "IMAGEDEF", "IMAGE"]);
    expect(classes.classes.map((c) => [c.name, c.instanceCount])).toEqual([
      ["IMAGEDEF", 1],
      ["IMAGE", 2],
    ]);
  });

  it("writes the record as AutoCAD does", () => {
    const classes = new DxfClassesSection();
    classes.collect(["IMAGE"]);
    expect(stringify(classes)).toBe(
      [
        ...["0", "SECTION", "2", "CLASSES", "0", "CLASS"],
        ...["1", "IMAGE", "2", "AcDbRasterImage", "3", "ISM"],
        ...["90", 2175, "91", 1, "280", 0, "281", 1, "0", "ENDSEC"],
      ].join("\n"),
    );
  });

  it("collects from scratch each time", () => {
    const classes = new DxfClassesSection();
    classes.collect(["IMAGE"]);
    classes.collect(["ACAD_TABLE"]);
    expect(classes.classes.map((c) => c.name)).toEqual(["ACAD_TABLE"]);
  });

  it("declares the classes of a drawing with images when it is written", () => {
    const dxf = new DxfWriter();
    dxf.addImage("a.png", "a", point3d(0, 0, 0), 64, 32, 64, 0);
    dxf.addImage("b.png", "b", point3d(100, 0, 0), 48, 48, 48, 0);
    const content = dxf.stringify();
    expect(
      dxf.document.classes.classes.map((c) => [c.name, c.instanceCount]),
    ).toEqual([
      ["IMAGEDEF", 2],
      ["RASTERVARIABLES", 1],
      ["IMAGEDEF_REACTOR", 2],
      ["IMAGE", 2],
    ]);
    expect(content.indexOf("\nCLASS\n")).toBeLessThan(
      content.indexOf("\nTABLES\n"),
    );
  });

  it("declares none for a drawing of lines", () => {
    const dxf = new DxfWriter();
    dxf.addLine(point3d(0, 0, 0), point3d(1, 1, 0));
    expect(dxf.stringify()).toContain("0\nSECTION\n2\nCLASSES\n0\nENDSEC");
  });
});
