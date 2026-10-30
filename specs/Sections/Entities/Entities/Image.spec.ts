import { describe, expect, it } from "vitest";
import { DxfWriter, point3d } from "../../../../src";

describe("Image class", () => {
  it("should keep every image in one ACAD_IMAGE_DICT", () => {
    const dxf = new DxfWriter();
    dxf.addImage("a.png", "a", point3d(0, 0, 0), 10, 10, 10, 0);
    dxf.addImage("b.png", "b", point3d(20, 0, 0), 10, 10, 10, 0);

    const root = dxf.document.objects.root;
    const imageDicts = root.entries.filter(
      (entry) => entry.name === "ACAD_IMAGE_DICT",
    );
    expect(imageDicts).toHaveLength(1);
    const dictionary = dxf.document.objects.imageDictionary();
    expect(imageDicts[0]?.entryObjectHandle).toBe(dictionary.handle);
    expect(dictionary.entries.map((entry) => entry.name)).toEqual(["a", "b"]);
  });
});
