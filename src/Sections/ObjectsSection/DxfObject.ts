import DxfDefinedApplication from "Internals/DefinedApplication";
import type { Dxfier } from "Internals/Dxfier";
import Handle from "Internals/Handle";
import type { DxfInterface } from "Internals/Interfaces";

export class DxfObject implements DxfInterface {
  readonly type: string;
  readonly handle: string;
  ownerObjecthandle: string;
  /** The handles of the objects told when this one changes, its ACAD_REACTORS group. */
  readonly reactors: string[] = [];

  constructor(type: string) {
    this.type = type;
    this.ownerObjecthandle = "0";
    this.handle = Handle.next();
  }

  dxfy(dx: Dxfier) {
    dx.type(this.type);
    dx.handle(this.handle);
    if (this.reactors.length > 0) {
      const group = new DxfDefinedApplication("ACAD_REACTORS");
      for (const handle of this.reactors) group.add(330, handle);
      group.dxfy(dx);
    }
    dx.push(330, this.ownerObjecthandle);
  }
}
