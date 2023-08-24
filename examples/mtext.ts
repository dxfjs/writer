import { Colors, XTextBuilder, XWriter, point } from "../src";
import { save } from "./utils";

const writer = new XWriter();
const modelSpace = writer.document.modelSpace;

const yellow = writer.document.tables.addLayer({
  name: "Yellow",
  colorNumber: Colors.Yellow,
});

const builder = new XTextBuilder();
const p1 = builder.add(
  {
    value: "Hello World!",
    fontFamily: "Arial",
    italic: true,
  },
  true
);
p1.add({
  value: " Hello World!",
  fontFamily: "Arial",
  colorNumber: Colors.Red,
});
const p2 = builder.add({
  value: "Hello World!",
  fontFamily: "OpenSans",
  italic: true,
  colorNumber: Colors.Green,
});
p2.add({
  value: " Hello World!",
  colorNumber: Colors.Yellow,
});

modelSpace.addMText({
  height: 10,
  insertionPoint: point(15, 11),
  value: builder.value,
  layerName: yellow.name,
});

const builder2 = new XTextBuilder();

builder2.add(
  {
    value: "Hello World!",
    fontFamily: "Arial",
    italic: true,
    colorNumber: Colors.Green,
  },
  true
);

builder2.add(
  {
    value: "Hello World!",
    fontFamily: "Arial",
    italic: true,
    colorNumber: Colors.Green,
  }
);

console.log(builder2.value);

save(writer.stringify(), __filename);