import { Units, XDocument } from "../src";

describe("XDocument class", () => {
  it("should create dxf document", () => {
    const document = new XDocument();
    expect(document.stringify()).toMatchSnapshot();
  });

  it("should set units", () => {
    const document = new XDocument();
    document.setUnits(Units.Millimeters);
    expect(document.units).toBe(4);
  });
});
