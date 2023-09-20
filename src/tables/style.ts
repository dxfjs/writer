import { Handle, TagsManager, XData } from "@/utils";
import { Entry } from "./entry";
import { XTable } from "./table";

export const TEXT_ITALIC = 16777250;
export const TEXT_BOLD = 33554466;

export const StyleFlags = {
  None: 0,
  DescribesShape: 1,
  VerticalText: 4,
  XRefDependent: 16,
  XRefResolved: 32,
  Referenced: 64,
} as const;

export const TextGenerationFlags = {
  None: 0,
  Backward: 2,
  UpsideDown: 4,
} as const;

export interface StyleOptions {
  name: string;
  flags?: number;
  fixedTextHeight?: number;
  widthFactor?: number;
  obliqueAngle?: number;
  textGenerationFlags?: number;
  lastHeightUsed?: number;
  primaryfontFileName?: string;
  bigFontFileName?: string;
  fontFamily?: string;
  italic?: boolean;
  bold?: boolean;
}

export class StyleEntry extends Entry {
  readonly name: string;
  flags: number;
  fixedTextHeight: number;
  widthFactor: number;
  obliqueAngle: number;
  textGenerationFlags: number;
  lastHeightUsed: number;
  primaryfontFileName: string;
  bigFontFileName: string;
  fontFamily?: string;
  italic?: boolean;
  bold?: boolean;

  readonly xdata: XData;

  constructor(options: StyleOptions, handle: Handle) {
    super("STYLE", handle);
    this.name = options.name;
    this.flags = options.flags ?? StyleFlags.None;
    this.fixedTextHeight = options.fixedTextHeight ?? 0;
    this.widthFactor = options.widthFactor ?? 1;
    this.obliqueAngle = options.obliqueAngle ?? 0;
    this.textGenerationFlags =
      options.textGenerationFlags ?? TextGenerationFlags.None;
    this.lastHeightUsed = options.lastHeightUsed ?? 1;
    this.primaryfontFileName = options.primaryfontFileName || "txt";
    this.bigFontFileName = options.bigFontFileName || "";
    this.fontFamily = options.fontFamily;
    this.italic = options.italic;
    this.bold = options.bold;
    this.xdata = new XData("ACAD");
  }

  override tagify(mg: TagsManager): void {
    super.tagify(mg);
    mg.add(100, "AcDbTextStyleTableRecord");
    mg.add(2, this.name);
    mg.add(70, this.flags);
    mg.add(40, this.fixedTextHeight);
    mg.add(41, this.widthFactor);
    mg.add(50, this.obliqueAngle);
    mg.add(71, this.textGenerationFlags);
    mg.add(42, this.lastHeightUsed);
    mg.add(3, this.fontFamily == null ? this.primaryfontFileName : "");
    mg.add(4, this.bigFontFileName);
    this.updateXData(), this.xdata.tagify(mg);
  }

  private updateXData() {
    this.xdata.clear();
    if (this.fontFamily != null) this.xdata.string(this.fontFamily);
    let flags = 34;
    if (this.italic != null) flags |= TEXT_ITALIC;
    if (this.bold != null) flags |= TEXT_BOLD;
    this.xdata.long(flags);
  }
}

export class Style extends XTable<StyleEntry> {
  constructor(handle: Handle) {
    super("STYLE", handle);
  }

  add(options: StyleOptions) {
    return this.addEntry(new StyleEntry(options, this.handle));
  }
}
