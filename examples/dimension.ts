import { Colors, Writer, dline, point } from "../src";
import { fileURLToPath, save } from "./utils";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

writer.document.header.add("$DIMTXT").add(40, 2.5);

const green = writer.document.tables.addLayer({
  name: "Green",
  colorNumber: Colors.Green,
});

modelSpace.currentLayerName = green.name;

modelSpace.addAlignedDim({
  start: point(),
  end: point(100, 100),
  offset: 10,
});

modelSpace.addLinearDim({
  start: point(),
  end: point(100, 100),
  offset: 10,
  angle: 0,
});

writer.document.tables.dimStyleStandard.options.DIMTXT = 2.5;

const dim = modelSpace.addAngularLinesDim({
  firstLine: dline(point(0, 2.5), point(10, 2.5)),
  secondLine: dline(point(0, 5), point(5, 10)),
  positionArc: point(6.988716, 5.042493),
  middle: point(6.575676, 6.259268),
  measurement: 0.785398,
  dimStyleName: writer.document.tables.dimStyleStandard.options.name,
});

writer.document.tables.dimStyleStandard.reactors.add(330, dim.handleSeed);

modelSpace.addAngularPointsDim({
  center: point(100),
  first: point(100, 100),
  second: point(200),
  middle: point(134.9199, 93.7049),
});

modelSpace.addRadialDim({
  first: point(170.7107, 70.7107),
  leaderLength: 10,
  definition: point(100, 0),
});

modelSpace.addDiameterDim({
  first: point(200, 0),
  leaderLength: 10,
  definition: point(),
});

save(writer.stringify(), fileURLToPath(import.meta.url));
