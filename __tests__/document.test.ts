import { Units, Document } from "../src";

describe("XDocument class", () => {
  it("should create dxf document", () => {
    const document = new Document();
    expect(document.stringify()).toMatchSnapshot();
  });

  it("should set units", () => {
    const document = new Document();
    document.setUnits(Units.Millimeters);
    expect(document.units).toBe(4);
  });
});
