import { Colors, TrueColor, Writer, point } from "@/index";
import { fileURLToPath, save } from "./utils";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

const green = writer.document.tables.addLayer({
  name: "Green",
  colorNumber: Colors.Green,
  trueColor: TrueColor.fromRGB(1, 100, 50),
});

modelSpace.currentLayerName = green.name;

modelSpace.addLine({ start: point(), end: point(100, 100) });

modelSpace.addLine({
  start: point(20),
  end: point(120, 100),
  trueColor: TrueColor.fromRGB(200, 100, 50),
});

save(writer.stringify(), fileURLToPath(import.meta.url));
