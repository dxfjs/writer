import { Colors, PolylineFlags, VertexFlags, XWriter } from "../src";
import { fileURLToPath, save } from "./utils";

const writer = new XWriter();
const modelSpace = writer.document.modelSpace;

const cyan = writer.document.tables.addLayer({
  name: "Cyan",
  colorNumber: Colors.Cyan,
});

modelSpace.currentLayerName = cyan.name;

const vertices = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 1, 1],
];

const faces = [
  [0, 3, 2, 1],
  [1, 2, 6, 5],
  [3, 7, 6, 2],
  [0, 4, 7, 3],
  [0, 1, 5, 4],
  [4, 5, 6, 7],
];

const mesh = modelSpace.addPolyline({
  flags: PolylineFlags.PolyfaceMesh,
});

const flags = VertexFlags.PolyfaceMeshVertex | VertexFlags.Polyline3DMesh;

vertices.forEach((vertex) => {
  const [x, y, z] = vertex;
  mesh.add({ x, y, z, flags });
});

faces.forEach((indices) => {
  mesh.add({
    indices: indices.map((i) => i + 1),
    flags: VertexFlags.PolyfaceMeshVertex,
    faceRecord: true,
  });
});

save(writer.stringify(), fileURLToPath(import.meta.url));
