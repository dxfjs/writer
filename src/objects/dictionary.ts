import { Handle, TagsManager } from "../utils";
import { XObject } from "./object";

export const DuplicateRecordFlags = {
  NotApplicable: 0,
  KeepExisting: 1,
  UseClone: 2,
  XRef$0$Name: 3,
  $0$Name: 4,
  UnmangleName: 5,
} as const;

export interface ObjectEntry {
  name: string;
  handleSeed: string;
}

export class Dictionary extends XObject {
  hardOwnerFlag?: number;
  duplicateRecordFlag: number;

  entries: ObjectEntry[];

  constructor(handle: Handle) {
    super("DICTIONARY", handle);
    this.duplicateRecordFlag = DuplicateRecordFlags.NotApplicable;
    this.entries = [];
  }

  add(name: string, handleSeed: string) {
    this.entries.push({ name, handleSeed: handleSeed });
  }

  override tagify(mg: TagsManager): void {
    super.tagify(mg);
    mg.add(100, "AcDbDictionary");
    mg.add(280, this.hardOwnerFlag);
    mg.add(281, this.duplicateRecordFlag);
    this.entries.forEach(e => {
      mg.add(3, e.name);
      mg.add(350, e.handleSeed);
    });
  }
}
