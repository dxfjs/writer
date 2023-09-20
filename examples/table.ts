import { Colors, TextBuilder, Writer, point } from "@/index";
import { fileURLToPath, save } from "./utils";

const writer = new Writer();
const modelSpace = writer.document.modelSpace;

const green = writer.document.tables.addLayer({
  name: "Green",
  colorNumber: Colors.Green,
});

const cyan = writer.document.tables.addLayer({
  name: "Cyan",
  colorNumber: Colors.Cyan,
});

modelSpace.currentLayerName = green.name;

modelSpace.addTable({
  cells: [],
  columnsCount: 3,
  columnsHeight: [],
  insertionPoint: point(0, 18),
  rowsCount: 2,
  rowsHeight: [],
});

const table = modelSpace.addTable({
  cells: [],
  columnsCount: 10,
  columnsHeight: [6],
  insertionPoint: point(),
  rowsCount: 3,
  rowsHeight: [4],
});

const textHeight = 1;

for (let i = 0; i < 30; i++) {
  table.add({ text: `${i + 1}`, textHeight });
}

const table2 = modelSpace.addTable({
  cells: [],
  columnsCount: 10,
  columnsHeight: [6],
  insertionPoint: point(0, 14),
  rowsCount: 3,
  rowsHeight: [4],
  layerName: cyan.name,
});

for (let i = 0; i < 30; i++) {
  if (i > 9) table2.add({ text: `${i + 1}`, textHeight });
  else table2.add({});
}

const builder = new TextBuilder();
const txt = builder.add({
  value: "Hello World!",
  fontFamily: "Arial",
  bold: true,
});

table2.cells[0].text = txt.value;
table2.cells[0].textHeight = 2;

save(writer.stringify(), fileURLToPath(import.meta.url));
