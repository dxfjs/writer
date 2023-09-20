import { Colors, Writer, point } from "@/index";
import { fileURLToPath, save } from "./utils";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

const green = writer.document.tables.addLayer({
  name: "Green",
  colorNumber: Colors.Green,
});

const dashed = writer.document.tables.addLType({
  name: "DASHED",
  descriptive: "Dashed Line",
  elements: [1, -1, 1, -1],
});

const line = modelSpace.addLine({
  start: point(),
  end: point(100, 100),
  layerName: green.name,
  lineTypeName: dashed.name,
});

line.lineTypeScale = 5;

save(writer.stringify(), fileURLToPath(import.meta.url));
