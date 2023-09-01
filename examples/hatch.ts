import {
  Colors,
  HatchGradient,
  HatchGradientType,
  HatchPattern,
  HatchPolyline,
  Writer,
  point,
  point2d,
} from "../src";
import { fileURLToPath, save } from "./utils";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

const cyan = writer.document.tables.addLayer({
  name: "Cyan",
  colorNumber: Colors.Cyan,
});

modelSpace.currentLayerName = cyan.name;

const gradient = new HatchGradient({
  first: Colors.Green,
  second: Colors.Red,
  type: HatchGradientType.Cylinder,
  angle: 20,
});

const pattern = new HatchPattern({
  name: "TEST",
});

pattern.add({
  angle: 0,
  base: point2d(),
  offset: point2d(0, 5),
  dashLengths: [2, -3],
});

pattern.add({
  angle: 45,
  base: point2d(),
  offset: point2d(5, 0),
  dashLengths: [4, -1],
});

const hatch1 = modelSpace.addHatch({
  fill: gradient,
});

const boundary1 = hatch1.add();
boundary1.line({ start: point2d(), end: point(10, 0) });
boundary1.arc({
  center: point2d(10, 5),
  radius: 5,
  start: -90,
  end: 90,
});
boundary1.ellipse({
  center: point2d(5, 10),
  endpoint: point2d(5),
  ratio: 0.5,
  start: 0,
  end: 180,
});
boundary1.line({ start: point(0, 10), end: point2d() });

const hatch2 = modelSpace.addHatch({
  fill: pattern,
});

const hatchPolyline = new HatchPolyline({ isClosed: true });
hatchPolyline.add(point(20));
hatchPolyline.add(point(40));
hatchPolyline.add(point(40, 20));
hatchPolyline.add(point(20, 20));
hatch2.add().polyline(hatchPolyline);

save(writer.stringify(), fileURLToPath(import.meta.url));
