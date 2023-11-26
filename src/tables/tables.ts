import { AppId, AppIdEntry, AppIdOptions } from "./appid";
import { BlockRecord, BlockRecordOptions } from "./block";
import { DimStyle, DimStyleEntry, DimStyleOptions } from "./dimstyle";
import { LType, LTypeEntry, LTypeOptions } from "./ltype";
import { Layer, LayerEntry, LayerOptions } from "./layer";
import { OmitSeeder, Taggable, WithSeeder } from "@/types";
import { Seeder, TagsManager } from "@/utils";
import { Style, StyleEntry, StyleOptions } from "./style";
import { VPort, VPortEntry, VPortOptions } from "./vport";
import { Ucs } from "./ucs";
import { View } from "./view";

export interface TablesOptions extends WithSeeder {}

export class Tables implements Taggable, WithSeeder {
  readonly seeder: Seeder;
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

  constructor(options: TablesOptions) {
    this.seeder = options.seeder;
    this.appId = new AppId(this);
    this.blockRecord = new BlockRecord(this);
    this.dimStyle = new DimStyle(this);
    this.layer = new Layer(this);
    this.ltype = new LType(this);
    this.style = new Style(this);
    this.view = new View(this);
    this.ucs = new Ucs(this);
    this.vport = new VPort(this);

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
    this.dimStyleStandard.options.DIMTXSTY = this.styleStandard.handle;
    this.vportActive = this.addVPort({ name: "*Active" });
  }

  addAppId(options: OmitSeeder<AppIdOptions>) {
    return this.appId.add(options);
  }

  addBlockRecord(options: OmitSeeder<BlockRecordOptions>) {
    return this.blockRecord.add(options);
  }

  addDimStyle(options: OmitSeeder<DimStyleOptions>) {
    return this.dimStyle.add(options);
  }

  addLayer(options: OmitSeeder<LayerOptions>) {
    return this.layer.add(options);
  }

  addDefpointsLayer() {
    const defpoints = this.layer.get("Defpoints");
    if (defpoints != null) return defpoints.name;
    return this.layer.add({ name: "Defpoints", plot: false }).name;
  }

  addLType(options: OmitSeeder<LTypeOptions>) {
    return this.ltype.add(options);
  }

  addStyle(options: OmitSeeder<StyleOptions>) {
    return this.style.add(options);
  }

  addVPort(options: OmitSeeder<VPortOptions>) {
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
