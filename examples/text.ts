import { Colors, Writer, point } from "@/index";
import { fileURLToPath, save } from "./utils";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

const cyan = writer.document.tables.addLayer({
  name: "Cyan",
  colorNumber: Colors.Cyan,
});

const style = writer.document.tables.addStyle({
  name: "style",
  fontFamily: "JetBrainsMono Nerd Font Mono",
  italic: true,
});

modelSpace.addText({
  firstAlignmentPoint: point(),
  value: "Hello World!",
  height: 10,
  styleName: style.name,
  layerName: cyan.name,
});

save(writer.stringify(), fileURLToPath(import.meta.url));
