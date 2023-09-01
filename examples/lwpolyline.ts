import { Colors, LWPolylineFlags, Writer, point } from "../src";
import { fileURLToPath, save } from "./utils";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

const green = writer.document.tables.addLayer({
  name: "Green",
  colorNumber: Colors.Green,
});

modelSpace.currentLayerName = green.name;

const polyline = modelSpace.addLWPolyline({
  flags: LWPolylineFlags.Closed,
});

polyline.add({ ...point() });
polyline.add({ ...point(100) });
polyline.add({ ...point(100, 100) });
polyline.add({ ...point(0, 100) });

save(writer.stringify(), fileURLToPath(import.meta.url));
