import { Colors, Writer, point } from "@/index";
import { fileURLToPath, save } from "./utils";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

const green = writer.document.tables.addLayer({
  name: "Green",
  colorNumber: Colors.Green,
});

modelSpace.currentLayerName = green.name;

const vertices = [
  point(0, 0, 0),
  point(1, 0, 0),
  point(1, 1, 0),
  point(0, 1, 0),
  point(0, 0, 1),
  point(1, 0, 1),
  point(1, 1, 1),
  point(0, 1, 1),
];

const faces = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [0, 1, 5, 4],
  [1, 2, 6, 5],
  [3, 2, 6, 7],
  [0, 3, 7, 4],
];

const mesh = modelSpace.addMesh({});
mesh.vertices = vertices;
mesh.faces = faces;
mesh.size = 3;

save(writer.stringify(), fileURLToPath(import.meta.url));
