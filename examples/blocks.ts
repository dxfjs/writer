import { Writer, point } from "@/index";
import { fileURLToPath, save } from "./utils";

const writer = new Writer();
const document = writer.document;
const modelSpace = writer.document.modelSpace;

const hr5 = document.tables.addStyle({
  name: "HR5",
  primaryfontFileName: "HR5.SHX",
});

const blk = document.addBlock({ name: "blk" });
blk.addCircle({ center: point(), radius: 5 });
blk.addLine({ start: point(), end: point(10, 10) });
const attdef = blk.addAttdef({
  firstAlignmentPoint: point(12, 10),
  height: 2,
  tag: "TAG",
  value: "",
  styleName: hr5.name,
});

const iblk = modelSpace.addInsert({
  blockName: blk.name,
  followAttributes: true,
});

modelSpace.addAttrib({
  ...attdef,
  insert: iblk,
  startPoint: attdef.firstAlignmentPoint,
  value: "B 16A",
});

modelSpace.push(iblk.seqend);

save(writer.stringify(), fileURLToPath(import.meta.url));
