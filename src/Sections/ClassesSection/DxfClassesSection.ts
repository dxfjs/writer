import type { Dxfier } from "Internals/Dxfier";
import type { DxfInterface } from "Internals/Interfaces";
import { type classDefinition_t, DxfClass } from "./DxfClass";

const ism = "ISM";
const objectDbx = "ObjectDBX Classes";

// the types written here that AutoCAD loads only with a CLASS record,
// with the values AutoCAD 2026 writes for them
const definitions: classDefinition_t[] = [
  {
    name: "ACAD_TABLE",
    cppClassName: "AcDbTable",
    applicationName: objectDbx,
    proxyFlags: 1025,
    isAnEntity: true,
  },
  {
    name: "IMAGEDEF",
    cppClassName: "AcDbRasterImageDef",
    applicationName: ism,
    proxyFlags: 0,
    isAnEntity: false,
  },
  {
    name: "RASTERVARIABLES",
    cppClassName: "AcDbRasterVariables",
    applicationName: ism,
    proxyFlags: 0,
    isAnEntity: false,
  },
  {
    name: "IMAGEDEF_REACTOR",
    cppClassName: "AcDbRasterImageDefReactor",
    applicationName: ism,
    proxyFlags: 1,
    isAnEntity: false,
  },
  {
    name: "IMAGE",
    cppClassName: "AcDbRasterImage",
    applicationName: ism,
    proxyFlags: 2175,
    isAnEntity: true,
  },
];

export class DxfClassesSection implements DxfInterface {
  readonly classes: DxfClass[] = [];

  /**
   * Keeps one CLASS record for each application-defined type among
   * `types`, the DXF type of every entity and object in the drawing,
   * counting its instances; a type AutoCAD knows by itself gets none.
   */
  collect(types: Iterable<string>): void {
    const counts = new Map<string, number>();
    for (const type of types) {
      counts.set(type, (counts.get(type) ?? 0) + 1);
    }
    this.classes.length = 0;
    for (const definition of definitions) {
      const count = counts.get(definition.name);
      if (count) this.classes.push(new DxfClass(definition, count));
    }
  }

  dxfy(dx: Dxfier) {
    dx.start("CLASSES");
    for (const c of this.classes) c.dxfy(dx);
    dx.end();
  }
}
