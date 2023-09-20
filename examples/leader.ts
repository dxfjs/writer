import { Colors, PathType, Writer, point } from "@/index";
import { fileURLToPath, save } from "./utils";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

const cyan = writer.document.tables.addLayer({
  name: "Cyan",
  colorNumber: Colors.Cyan,
});

modelSpace.addLeader({
  vertices: [point(0, 0), point(1, 1), point(2, 1)],
  layerName: cyan.name,
  arrowhead: true,
});

modelSpace.addLeader({
  vertices: [point(2, 0), point(3, 1), point(4, 1)],
  layerName: cyan.name,
  arrowhead: true,
  pathType: PathType.Spline,
  colorNumber: Colors.Red,
});

save(writer.stringify(), fileURLToPath(import.meta.url));
