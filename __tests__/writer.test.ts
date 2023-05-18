import "../examples";
import { Colors, InvisibleEdge, LWPolylineFlags, XWriter, point } from "../src";
import { writeFileSync } from "fs";


describe("XWriter class", () => {
  const writer = new XWriter();
  it("should match snapshot", () => {
    expect(writer.stringify()).toMatchSnapshot();
  });

  it("should output the dxf content", () => {
    const w = new XWriter();
    w.document.addVariable("$DIMTXT").add(40, 10);
    w.document.modelSpace.addLine({
      start: point(),
      end: point(100, 100),
    });
    w.document.modelSpace.addAlignedDimension({
      start: point(),
      end: point(100, 100),
      offset: 10,
    });
    w.document.modelSpace.addPoint(point(110, 110));
    w.document.modelSpace.addRay({
      start: point(110, 120),
      unitDirectionVector: point(130, 130),
    });
    w.document.modelSpace.addArc({
      center: point(),
      radius: 100,
      startAngle: 90,
      endAngle: 180,
    });
    w.document.modelSpace.addCircle({
      center: point(),
      radius: 100,
    });
    const tarik = w.document.addBlock({
      name: "Tarik",
      basePoint: point(),
    });
    tarik.addCircle({
      center: point(),
      radius: 20,
    });
    tarik.addLWPolyline({
      vertices: [point(0, -20), point(20), point(0, 20), point(-20)],
      flags: LWPolylineFlags.Closed,
    });
    tarik.addAlignedDimension({
      start: point(-20),
      end: point(20),
      dimStyleName: w.document.tables.dimStyleStandard.options.name,
    });
    w.document.modelSpace.addInsert({
      blockName: tarik.name,
      insertionPoint: point(200, 200),
    });
    w.document.modelSpace.addSpline({
      controls: [point(), point(10, 10), point(20, 10), point(30, 20)],
    });
    const p = w.document.modelSpace.addPolyline({});
    p.add({});
    p.add(point(-10, -10));
    p.add(point(-20, -10));
    p.add(point(-30, -20));
    w.document.addPaperSpace();
    w.document.addPaperSpace();
    const tarikStyle = w.document.tables.addStyle({
      name: "Tarik",
      fontFamily: "JetBrainsMono Nerd Font",
      italic: true,
    });
    w.document.modelSpace.addText({
      firstAlignmentPoint: point(0, 100),
      value: "Hello World!",
      height: 10,
      styleName: tarikStyle.name,
    });
    const mtext = w.document.modelSpace.addMText({
      insertionPoint: point(0, 50),
      height: 10,
      styleName: tarikStyle.name,
      referenceRectangleWidth: 200,
      referenceRectangleHeight: 50,
    });
    mtext.add({
      value: "Tarik",
      fontFamily: "JetBrainsMono Nerd Font",
      italic: true,
      bold: true,
      colorNumber: Colors.Cyan,
      center: true,
    });
    mtext.add({
      value: "EL JABIRI",
      fontFamily: "JetBrainsMono Nerd Font Mono",
      bold: true,
      colorNumber: Colors.Green,
      underline: true,
    });
    w.document.modelSpace.addEllipse({
      center: point(),
      endpoint: point(20, 50),
      ratio: 0.5,
    });
    w.document.modelSpace.addEllipse({
      center: point(),
      endpoint: point(100),
    });
    w.document.modelSpace.addFace({
      first: point(),
      second: point(100),
      third: point(100, 100),
      fourth: point(0, 100),
      flags: InvisibleEdge.First,
    });
    w.document.addPaperSpace();
    w.document.modelSpace.addLeader({
      vertices: [point(), point(100, 100)],
    });
    w.document.modelSpace.bbox();

    expect(w.document.paperSpace.isPaperSpace).toBeTruthy();
    writeFileSync("examples/default.dxf", w.stringify());
  });
});
