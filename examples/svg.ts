import { Colors, Writer, dline, point } from "@/index";
import { fileURLToPath, save } from "./utils";
import { svg } from "@/svg";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

const green = writer.document.tables.addLayer({
  name: "Green",
  colorNumber: Colors.Green,
});

const blue = writer.document.tables.addLayer({
  name: "Blue",
  colorNumber: Colors.Blue,
});

modelSpace.currentLayerName = green.name;

modelSpace.addLine({ start: point(), end: point(20, 20) });
modelSpace.addLine({ start: point(0, 2.5), end: point(20, 2.5) });
modelSpace.addLine({ start: point(0, 5), end: point(5, 10) });

modelSpace.currentLayerName = blue.name;

const aligned = modelSpace.addAlignedDim({
  start: point(),
  end: point(20, 20),
  offset: 5,
});

writer.document.renderer.aligned(aligned);


const angular = modelSpace.addAngularLinesDim({
  firstLine: dline(point(0, 2.5), point(20, 2.5)),
  secondLine: dline(point(0, 5), point(5, 10)),
  positionArc: point(15, 10),
  middle: point(6.575676, 6.259268),
  measurement: 0.785398,
});

writer.document.renderer.angularLines(angular);

save(svg(writer.document), fileURLToPath(import.meta.url), ".svg");
