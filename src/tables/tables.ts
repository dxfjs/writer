import { AppIdEntry, AppIdOptions, XAppId } from "./appid";
import { BlockRecordEntry, BlockRecordOptions, XBlockRecord } from "./block";
import { DimStyleEntry, DimStyleOptions, XDimStyle } from "./dimstyle";
import { LTypeEntry, LTypeOptions, XLType } from "./ltype";
import { LayerEntry, LayerOptions, XLayer } from "./layer";
import { StyleEntry, StyleOptions, XStyle } from "./style";
import { VPortEntry, VPortOptions, XVPort } from "./vport";
import { XHandle, XTagsManager } from "../utils";
import { Taggable } from "../types";
import { XUcs } from "./ucs";
import { XView } from "./view";

export class XTables implements Taggable {
  readonly handle: XHandle;
  readonly appId: XAppId;
  readonly blockRecord: XBlockRecord;
  readonly dimStyle: XDimStyle;
  readonly layer: XLayer;
  readonly ltype: XLType;
  readonly style: XStyle;
  readonly view: XView;
  readonly ucs: XUcs;
  readonly vport: XVPort;

  readonly appIdAcad: AppIdEntry;
  readonly blockRecordModelSpace: BlockRecordEntry;
  readonly blockRecordPaperSpace: BlockRecordEntry;
  readonly dimStyleStandard: DimStyleEntry;
  readonly zeroLayer: LayerEntry;
  readonly ltypeContinous: LTypeEntry;
  readonly styleStandard: StyleEntry;
  readonly vportActive: VPortEntry;

  private static paperSpaceSeed = 0;

  constructor(handle: XHandle) {
    this.handle = handle;
    this.appId = new XAppId(handle);
    this.blockRecord = new XBlockRecord(handle);
    this.dimStyle = new XDimStyle(handle);
    this.layer = new XLayer(handle);
    this.ltype = new XLType(handle);
    this.style = new XStyle(handle);
    this.view = new XView(handle);
    this.ucs = new XUcs(handle);
    this.vport = new XVPort(handle);

    this.appIdAcad = this.addAppId({ name: "ACAD" });
    this.blockRecordModelSpace = this.addBlockRecord({ name: "*Model_Space" });
    this.blockRecordPaperSpace = this.addBlockRecord({ name: "*Paper_Space" });
    this.dimStyleStandard = this.addDimStyle({ name: "Standard" });
    this.zeroLayer = this.addLayer({ name: LayerEntry.layerZeroName });
    this.addLType({ name: "ByLayer" });
    this.addLType({ name: "ByBlock" });
    this.ltypeContinous = this.addLType({
      name: "Continuous",
      descriptive: "Solid line",
    });
    this.styleStandard = this.addStyle({ name: "Standard" });
    this.dimStyleStandard.options.DIMTXSTY = this.styleStandard.handleSeed;
    this.vportActive = this.addVPort({ name: "*Active" });
  }

  addAppId(options: AppIdOptions) {
    return this.appId.add(options);
  }

  addBlockRecord(options: BlockRecordOptions) {
    return this.blockRecord.add(options);
  }

  addPaperSpace() {
    return this.addBlockRecord({
      name: `*Paper_Space${XTables.paperSpaceSeed++}`,
    });
  }

  addDimStyle(options: DimStyleOptions) {
    return this.dimStyle.add(options);
  }

  addLayer(options: LayerOptions) {
    return this.layer.add(options);
  }

  addLType(options: LTypeOptions) {
    return this.ltype.add(options);
  }

  addStyle(options: StyleOptions) {
    return this.style.add(options);
  }

  addVPort(options: VPortOptions) {
    return this.vport.add(options);
  }

  tagify(mg: XTagsManager): void {
    mg.sectionStart("TABLES");
    this.appId.tagify(mg);
    this.blockRecord.tagify(mg);
    this.dimStyle.tagify(mg);
    this.ltype.tagify(mg);
    this.style.tagify(mg);
    this.layer.tagify(mg);
    this.view.tagify(mg);
    this.ucs.tagify(mg);
    this.vport.tagify(mg);
    mg.sectionEnd();
  }
}
