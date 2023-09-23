import { AppId, AppIdEntry, AppIdOptions } from "./appid";
import { BlockRecord, BlockRecordOptions } from "./block";
import { DimStyle, DimStyleEntry, DimStyleOptions } from "./dimstyle";
import { Handle, TagsManager } from "@/utils";
import { LType, LTypeEntry, LTypeOptions } from "./ltype";
import { Layer, LayerEntry, LayerOptions } from "./layer";
import { Style, StyleEntry, StyleOptions } from "./style";
import { VPort, VPortEntry, VPortOptions } from "./vport";
import { Taggable } from "@/types";
import { Ucs } from "./ucs";
import { View } from "./view";

export class Tables implements Taggable {
  readonly handle: Handle;
  readonly appId: AppId;
  readonly blockRecord: BlockRecord;
  readonly dimStyle: DimStyle;
  readonly layer: Layer;
  readonly ltype: LType;
  readonly style: Style;
  readonly view: View;
  readonly ucs: Ucs;
  readonly vport: VPort;

  readonly appIdAcad: AppIdEntry;
  readonly dimStyleStandard: DimStyleEntry;
  readonly zeroLayer: LayerEntry;
  readonly ltypeContinous: LTypeEntry;
  readonly styleStandard: StyleEntry;
  readonly vportActive: VPortEntry;

  constructor(handle: Handle) {
    this.handle = handle;
    this.appId = new AppId(handle);
    this.blockRecord = new BlockRecord(handle);
    this.dimStyle = new DimStyle(handle);
    this.layer = new Layer(handle);
    this.ltype = new LType(handle);
    this.style = new Style(handle);
    this.view = new View(handle);
    this.ucs = new Ucs(handle);
    this.vport = new VPort(handle);

    this.appIdAcad = this.addAppId({ name: "ACAD" });
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

  tagify(mg: TagsManager): void {
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
