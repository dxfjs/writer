import { Polyline, PolylineFlags, VertexFlags } from "@/entities";
import { Seeder, TagsManager } from "@/utils";

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

describe("Polyline class", () => {
  it("should cover the polyline entity", () => {
    const mg = new TagsManager();
    const seeder = new Seeder();
    const polyface = new Polyline({
      flags: PolylineFlags.PolyfaceMesh,
      seeder,
    });

    const vertexFlags =
      VertexFlags.PolyfaceMeshVertex | VertexFlags.Polyline3DMesh;

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

    polyface.tagify(mg);

    const polyline2D = new Polyline({ seeder });
    polyline2DVertices.forEach((vertex) => {
      const [x, y, z] = vertex;
      polyline2D.add({ x, y, z });
    });

    polyline2D.tagify(mg);

    const polyline3D = new Polyline({
      flags: PolylineFlags.Polyline3D,
      seeder,
    });
    polyline3DVertices.forEach((vertex) => {
      const [x, y, z] = vertex;
      polyline3D.add({ x, y, z, flags: VertexFlags.Polyline3DVertex });
    });

    polyline3D.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
