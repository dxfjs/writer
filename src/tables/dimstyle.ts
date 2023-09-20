import { Handle, TagsManager } from "@/utils";
import { Entry } from "./entry";
import { Table } from "./table";

export const DimStyleFlags = {
  None: 0,
  XRefDependent: 16,
  XRefResolved: 32,
  Referenced: 64,
} as const;

export interface DimStyleOptions {
  name: string;
  flags?: number;
  DIMPOST?: string;
  DIMAPOST?: string;
  DIMSCALE?: number;
  DIMASZ?: number;
  DIMEXO?: number;
  DIMDLI?: number;
  DIMEXE?: number;
  DIMRND?: number;
  DIMDLE?: number;
  DIMTP?: number;
  DIMTM?: number;
  DIMTXT?: number;
  DIMCEN?: number;
  DIMTSZ?: number;
  DIMALTF?: number;
  DIMLFAC?: number;
  DIMTVP?: number;
  DIMTFAC?: number;
  DIMGAP?: number;
  DIMALTRND?: number;
  DIMTOL?: number;
  DIMLIM?: number;
  DIMTIH?: number;
  DIMTOH?: number;
  DIMSE1?: number;
  DIMSE2?: number;
  DIMTAD?: number;
  DIMZIN?: number;
  DIMAZIN?: number;
  DIMALT?: number;
  DIMALTD?: number;
  DIMTOFL?: number;
  DIMSAH?: number;
  DIMTIX?: number;
  DIMSOXD?: number;
  DIMCLRD?: number;
  DIMCLRE?: number;
  DIMCLRT?: number;
  DIMADEC?: number;
  DIMDEC?: number;
  DIMTDEC?: number;
  DIMALTU?: number;
  DIMALTTD?: number;
  DIMAUNIT?: number;
  DIMFRAC?: number;
  DIMLUNIT?: number;
  DIMDSEP?: number;
  DIMTMOVE?: number;
  DIMJUST?: number;
  DIMSD1?: number;
  DIMSD2?: number;
  DIMTOLJ?: number;
  DIMTZIN?: number;
  DIMALTZ?: number;
  DIMALTTZ?: number;
  DIMFIT?: number;
  DIMUPT?: number;
  DIMATFIT?: number;
  DIMTXSTY?: string;
  DIMLDRBLK?: string;
  DIMBLK?: string;
  DIMBLK1?: string;
  DIMBLK2?: string;
  DIMLWD?: number;
  DIMLWE?: number;
}

export class DimStyleEntry extends Entry {
  options: DimStyleOptions;

  constructor(options: DimStyleOptions, handle: Handle) {
    super("DIMSTYLE", handle);
    this.handleCode = 105;
    options.flags ??= DimStyleFlags.None;
    this.options = options;
  }

  override tagify(mg: TagsManager): void {
    super.tagify(mg);
    mg.add(100, "AcDbDimStyleTableRecord");
    mg.add(2, this.options.name);
    mg.add(70, this.options.flags);
    mg.add(3, this.options.DIMPOST);
    mg.add(4, this.options.DIMAPOST);
    mg.add(40, this.options.DIMSCALE);
    mg.add(41, this.options.DIMASZ);
    mg.add(42, this.options.DIMEXO);
    mg.add(43, this.options.DIMDLI);
    mg.add(44, this.options.DIMEXE);
    mg.add(45, this.options.DIMRND);
    mg.add(46, this.options.DIMDLE);
    mg.add(47, this.options.DIMTP);
    mg.add(48, this.options.DIMTM);
    mg.add(140, this.options.DIMTXT);
    mg.add(141, this.options.DIMCEN);
    mg.add(142, this.options.DIMTSZ);
    mg.add(143, this.options.DIMALTF);
    mg.add(144, this.options.DIMLFAC);
    mg.add(145, this.options.DIMTVP);
    mg.add(146, this.options.DIMTFAC);
    mg.add(147, this.options.DIMGAP);
    mg.add(148, this.options.DIMALTRND);
    mg.add(71, this.options.DIMTOL);
    mg.add(72, this.options.DIMLIM);
    mg.add(73, this.options.DIMTIH);
    mg.add(74, this.options.DIMTOH);
    mg.add(75, this.options.DIMSE1);
    mg.add(76, this.options.DIMSE2);
    mg.add(77, this.options.DIMTAD);
    mg.add(78, this.options.DIMZIN);
    mg.add(79, this.options.DIMAZIN);
    mg.add(170, this.options.DIMALT);
    mg.add(171, this.options.DIMALTD);
    mg.add(172, this.options.DIMTOFL);
    mg.add(173, this.options.DIMSAH);
    mg.add(174, this.options.DIMTIX);
    mg.add(175, this.options.DIMSOXD);
    mg.add(176, this.options.DIMCLRD);
    mg.add(177, this.options.DIMCLRE);
    mg.add(178, this.options.DIMCLRT);
    mg.add(179, this.options.DIMADEC);
    mg.add(271, this.options.DIMDEC);
    mg.add(272, this.options.DIMTDEC);
    mg.add(273, this.options.DIMALTU);
    mg.add(274, this.options.DIMALTTD);
    mg.add(275, this.options.DIMAUNIT);
    mg.add(276, this.options.DIMFRAC);
    mg.add(277, this.options.DIMLUNIT);
    mg.add(278, this.options.DIMDSEP);
    mg.add(279, this.options.DIMTMOVE);
    mg.add(280, this.options.DIMJUST);
    mg.add(281, this.options.DIMSD1);
    mg.add(282, this.options.DIMSD2);
    mg.add(283, this.options.DIMTOLJ);
    mg.add(284, this.options.DIMTZIN);
    mg.add(285, this.options.DIMALTZ);
    mg.add(286, this.options.DIMALTTZ);
    mg.add(287, this.options.DIMFIT);
    mg.add(288, this.options.DIMUPT);
    mg.add(289, this.options.DIMATFIT);
    mg.add(340, this.options.DIMTXSTY);
    mg.add(341, this.options.DIMLDRBLK);
    mg.add(342, this.options.DIMBLK);
    mg.add(343, this.options.DIMBLK1);
    mg.add(344, this.options.DIMBLK2);
    mg.add(371, this.options.DIMLWD);
    mg.add(372, this.options.DIMLWE);
  }
}

export class DimStyle extends Table<DimStyleEntry> {
  constructor(handle: Handle) {
    super("DIMSTYLE", handle);
  }

  add(options: DimStyleOptions) {
    return this.addEntry(new DimStyleEntry(options, this.handle));
  }

  override tagify(mg: TagsManager): void {
    mg.add(0, "TABLE");
    mg.add(2, this.name);
    mg.add(5, this.handleSeed);
    this.xdictionary.tagify(mg);
    mg.add(330, this.ownerObjectHandle);
    mg.add(100, "AcDbSymbolTable");
    mg.add(70, this.entries.length);
    mg.add(100, "AcDbDimStyleTable");
    this.entries.forEach((e) => e.tagify(mg));
    mg.add(0, "ENDTAB");
  }
}
