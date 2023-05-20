import { Colors, XTextBuilder, XWriter, point } from "../src";
import { save } from "./utils";

const writer = new XWriter();
const modelSpace = writer.document.modelSpace;

const magenta = writer.document.tables.addLayer({
  name: "Magenta",
  colorNumber: Colors.Magenta,
});

const builder = new XTextBuilder();
const p1 = builder.add({
  value: "Hello World!",
  fontFamily: "JetBrainsMono Nerd Font",
  italic: true,
}, true);
p1.add({
  value: " Hello World!",
  fontFamily: "Arial",
  colorNumber: Colors.Red,
});
const p2 = builder.add({
  value: "Hello World!",
  fontFamily: "JetBrainsMono Nerd Font Mono",
  italic: true,
  colorNumber: Colors.Green,
});
p2.add({
  value: " Hello World!",
  colorNumber: Colors.Yellow,
});


modelSpace.addMLeader({
  textPosition: point(15, 11),
  lastPosition: point(10, 10),
  arrowheadSize: 2,
  value: builder.value,
  layerName: magenta.name,
  textHeight: 2,
  vertices: [point(), point(5)],
  doglegLength: 4,
});

save(writer.stringify(), __filename);
