import { Colors, PolylineFlags, VertexFlags, Writer } from "@/index";
import { fileURLToPath, save } from "./utils";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

const cyan = writer.document.tables.addLayer({
  name: "Cyan",
  colorNumber: Colors.Cyan,
});

modelSpace.currentLayerName = cyan.name;

const polyfaceVertices = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 1, 1],
];

const polyfaceFaces = [
  [0, 3, 2, 1],
  [1, 2, 6, 5],
  [3, 7, 6, 2],
  [0, 4, 7, 3],
  [0, 1, 5, 4],
  [4, 5, 6, 7],
];

const polyline2DVertices = [
  [0, 0, 0],
  [2, 0, 0],
  [2, 2, 0],
  [0, 2, 0],
];

const polyline3DVertices = [
  [0, 0, 1],
  [2, 0, 1],
  [2, 2, 1],
  [0, 2, 1],
];

const polyface = modelSpace.addPolyline({ flags: PolylineFlags.PolyfaceMesh });

const vertexFlags = VertexFlags.PolyfaceMeshVertex | VertexFlags.Polyline3DMesh;

polyfaceVertices.forEach((vertex) => {
  const [x, y, z] = vertex;
  polyface.add({ x, y, z, flags: vertexFlags });
});

polyfaceFaces.forEach((indices) => {
  polyface.add({
    indices: indices.map((i) => i + 1),
    flags: VertexFlags.PolyfaceMeshVertex,
    faceRecord: true,
  });
});

const polyline2D = modelSpace.addPolyline({
  flags: PolylineFlags.Closed,
});
polyline2DVertices.forEach((vertex) => {
  const [x, y, z] = vertex;
  polyline2D.add({ x, y, z });
});

const polyline3D = modelSpace.addPolyline({
  flags: PolylineFlags.Polyline3D | PolylineFlags.Closed,
});

polyline3DVertices.forEach((vertex) => {
  const [x, y, z] = vertex;
  polyline3D.add({ x, y, z, flags: VertexFlags.Polyline3DVertex });
});

save(writer.stringify(), fileURLToPath(import.meta.url));
