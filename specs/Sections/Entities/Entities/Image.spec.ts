import { DxfWriter } from "DxfWriter";
import { Dxfier, point3d } from "Internals";
import { DxfImageDefReactor, DxfRasterVariables } from "Sections";
import { describe, expect, it } from "vitest";

describe("Image", () => {
  const twoImages = () => {
    const dxf = new DxfWriter();
    const a = dxf.addImage("a.png", "a", point3d(0, 0, 0), 64, 32, 64, 0);
    const b = dxf.addImage("b.png", "b", point3d(100, 0, 0), 48, 48, 48, 0);
    return { a, b, objects: dxf.document.objects };
  };

  it("keeps every image definition in one ACAD_IMAGE_DICT", () => {
    const { objects } = twoImages();
    const dictionary = objects.imageDictionary;
    const keys = objects.root.entries.filter(
      (entry) => entry.name === "ACAD_IMAGE_DICT",
    );
    expect(keys).toHaveLength(1);
    expect(keys[0]?.entryObjectHandle).toBe(dictionary?.handle);
    expect(dictionary?.entries.map((entry) => entry.name)).toEqual(["a", "b"]);
    expect(dictionary?.duplicateRecordCloningFlag).toBe(1);
    expect(dictionary?.reactors).toEqual([objects.root.handle]);
  });

  it("files each definition under the dictionary, which it reacts to", () => {
    const { objects, a, b } = twoImages();
    const dictionary = objects.imageDictionary;
    const imageDefs = objects.objects.filter((o) => o.type === "IMAGEDEF");
    expect(imageDefs.map((d) => d.handle)).toEqual([
      a.imageDefHandle,
      b.imageDefHandle,
    ]);
    for (const imageDef of imageDefs) {
      expect(imageDef.ownerObjecthandle).toBe(dictionary?.handle);
    }
    expect(imageDefs[0]?.reactors).toEqual([
      dictionary?.handle,
      a.imageDefReactorHandle,
    ]);
    expect(imageDefs[1]?.reactors).toEqual([
      dictionary?.handle,
      b.imageDefReactorHandle,
    ]);
  });

  it("owns each reactor by its image", () => {
    const { objects, a, b } = twoImages();
    const reactors = objects.objects.filter(
      (o) => o instanceof DxfImageDefReactor,
    );
    expect(reactors.map((r) => r.handle)).toEqual([
      a.imageDefReactorHandle,
      b.imageDefReactorHandle,
    ]);
    expect(reactors.map((r) => r.ownerObjecthandle)).toEqual([
      a.handle,
      b.handle,
    ]);
    expect(reactors.map((r) => r.imageHandle)).toEqual([a.handle, b.handle]);
  });

  it("shares one definition between images of one name", () => {
    const dxf = new DxfWriter();
    const first = dxf.addImage(
      "logo.png",
      "logo",
      point3d(0, 0, 0),
      64,
      32,
      64,
      0,
    );
    const second = dxf.addImage(
      "logo.png",
      "logo",
      point3d(100, 0, 0),
      64,
      32,
      32,
      90,
    );
    const objects = dxf.document.objects;
    const imageDefs = objects.objects.filter((o) => o.type === "IMAGEDEF");
    expect(imageDefs).toHaveLength(1);
    expect(second.imageDefHandle).toBe(first.imageDefHandle);
    expect(imageDefs[0]?.reactors).toEqual([
      objects.imageDictionary?.handle,
      first.imageDefReactorHandle,
      second.imageDefReactorHandle,
    ]);
    expect(objects.imageDictionary?.entries).toHaveLength(1);
  });

  it("adds the raster variables under ACAD_IMAGE_VARS with the first image", () => {
    const { objects } = twoImages();
    const keys = objects.root.entries.filter(
      (entry) => entry.name === "ACAD_IMAGE_VARS",
    );
    const variables = objects.objects.filter(
      (o) => o instanceof DxfRasterVariables,
    );
    expect(keys).toHaveLength(1);
    expect(variables).toHaveLength(1);
    expect(keys[0]?.entryObjectHandle).toBe(variables[0]?.handle);
    expect(variables[0]?.ownerObjecthandle).toBe(objects.root.handle);
    expect(variables[0]?.reactors).toEqual([objects.root.handle]);
  });

  it("leaves a drawing without images without them", () => {
    const dxf = new DxfWriter();
    dxf.addLine(point3d(0, 0, 0), point3d(1, 1, 0));
    const objects = dxf.document.objects;
    expect(objects.imageDictionary).toBeUndefined();
    expect(objects.root.entries.map((entry) => entry.name)).toEqual([
      "ACAD_GROUP",
    ]);
  });

  it("writes the definition's reactors before its owner, as AutoCAD does", () => {
    const { objects, a } = twoImages();
    const imageDef = objects.objects.find((o) => o.handle === a.imageDefHandle);
    const dictionary = objects.imageDictionary?.handle;
    const dx = new Dxfier();
    imageDef?.dxfy(dx);
    expect(dx.stringify()).toBe(
      [
        ...["0", "IMAGEDEF", "5", imageDef?.handle],
        ...["102", "{ACAD_REACTORS", "330", dictionary],
        ...["330", a.imageDefReactorHandle, "102", "}"],
        ...["330", dictionary, "100", "AcDbRasterImageDef"],
        ...["90", 0, "1", "a.png", "10", 64, "20", 32, "11", 1, "21", 1],
        ...["280", 1, "281", 0],
      ].join("\n"),
    );
  });

});
