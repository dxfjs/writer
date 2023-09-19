import { Colors, Writer, point } from "../src";
import { fileURLToPath, save } from "./utils";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

const green = writer.document.tables.addLayer({
  name: "Green",
  colorNumber: Colors.Green,
});

modelSpace.currentLayerName = green.name;

modelSpace.addRectangle({
  origin: point(),
  width: 100,
});

modelSpace.addRectangle({
  origin: point(110),
  width: 100,
  corner: 20,
  colorNumber: Colors.Red,
});

modelSpace.addRectangle({
  origin: point(220),
  width: 100,
  corner: point(20, 20),
  colorNumber: Colors.Blue,
});

modelSpace.addRectangle({
  origin: point(330),
  width: 100,
  height: 200,
  corner: point(20, 10),
  colorNumber: Colors.Yellow,
});

save(writer.stringify(), fileURLToPath(import.meta.url));
