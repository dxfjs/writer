import { Colors, TextOptions, XWriter, point } from "../src";
import { fileURLToPath, save } from "./utils";

const writer = new XWriter();
const paperSpace = writer.document.paperSpace;
const paperSpace0 = writer.document.blocks.addPaperSpace();
const paperSpace1 = writer.document.blocks.addPaperSpace();
writer.document.blocks.addPaperSpace(); // paperSpace2

const green = writer.document.tables.addLayer({
  name: "Green",
  colorNumber: Colors.Green,
});

const style = writer.document.tables.addStyle({
  name: "style",
  fontFamily: "Arial",
  italic: true,
  bold: true,
});

const textOptions: TextOptions = {
  firstAlignmentPoint: point(),
  value: "Hello World!",
  height: 10,
  styleName: style.name,
  layerName: green.name,
};

paperSpace.addText(textOptions);
paperSpace0.addText(textOptions);
paperSpace1.addText(textOptions);


save(writer.stringify(), fileURLToPath(import.meta.url));
