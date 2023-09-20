import {
  BBox,
  BoundingBox,
  Handle,
  TagsManager,
  onezero,
  point,
} from "@/utils";
import { Entity, EntityOptions } from "./entity";
import { Point3D, Taggable, Union } from "@/types";

export interface TableOptions extends EntityOptions {
  blockName: string;
  insertionPoint: Point3D;
  rowsCount: number;
  columnsCount: number;
  horizontalDirection?: Point3D;
  rowsHeight: number[];
  columnsHeight: number[];
  cells: Cell[];
}

export const CellType = {
  Text: 1,
  Block: 2,
} as const;

export const CellAlignment = {
  TopLeft: 1,
  TopCenter: 2,
  TopRight: 3,
  MiddleLeft: 4,
  MiddleCenter: 5,
  MiddleRight: 6,
  BottomLeft: 7,
  BottomCenter: 8,
  BottomRight: 9,
} as const;

export interface CellOptions {
  type?: Union<typeof CellType>;
  merged?: boolean;
  autofit?: boolean;
  borderWidth?: number;
  borderHeight?: number;
  rotation?: number;
  text?: string;
  textHeight?: number;
  alignment?: Union<typeof CellAlignment>;
}

export class Cell implements Taggable {
  type: Union<typeof CellType>;
  merged: boolean;
  autofit: boolean;
  borderWidth: number;
  borderHeight: number;
  rotation: number;
  text?: string;
  textHeight?: number;
  alignment: Union<typeof CellAlignment>;

  constructor(options: CellOptions) {
    this.type = options.type || CellType.Text;
    this.merged = options.merged || false;
    this.autofit = options.autofit || false;
    this.borderWidth = options.borderWidth ?? 1;
    this.borderHeight = options.borderHeight ?? 1;
    this.rotation = options.rotation ?? 0;
    this.text = options.text;
    this.textHeight = options.textHeight;
    this.alignment = options.alignment || CellAlignment.MiddleCenter;
  }

  tagify(mg: TagsManager): void {
    mg.add(171, this.type);
    mg.add(173, onezero(this.merged));
    mg.add(174, onezero(this.autofit));
    mg.add(175, this.borderWidth);
    mg.add(176, this.borderHeight);
    mg.add(145, this.rotation);
    mg.add(170, this.alignment);
    mg.add(91, 262177);
    mg.add(140, this.textHeight);
    mg.add(301, "CELL_VALUE");
    mg.add(90, this.text ? 4 : 0);
    mg.add(1, this.text);
    mg.add(300, "");
    mg.add(302, this.text ?? "");
    mg.add(304, "ACVALUE_END");
  }
}

export class Table extends Entity {
  readonly blockName: string;
  insertionPoint: Point3D;
  rowsCount: number;
  columnsCount: number;
  horizontalDirection: Point3D;
  rowsHeight: number[];
  columnsHeight: number[];
  cells: Cell[];

  override get subClassMarker(): string | undefined {
    return "AcDbBlockReference";
  }

  constructor(options: TableOptions, handle: Handle) {
    super("ACAD_TABLE", handle, options);
    this.blockName = options.blockName;
    this.insertionPoint = options.insertionPoint;
    this.rowsCount = options.rowsCount;
    this.columnsCount = options.columnsCount;
    this.horizontalDirection = options.horizontalDirection || point(1);
    this.rowsHeight = options.rowsHeight;
    this.columnsHeight = options.columnsHeight;
    this.cells = options.cells;
  }

  add(options: CellOptions) {
    this.cells.push(new Cell(options));
  }

  override bbox(): BoundingBox {
    // TODO: find a way to get the bbox
    return BBox.point(this.insertionPoint);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.add(2, this.blockName);
    mg.point(this.insertionPoint);
    mg.add(100, "AcDbTable");
    mg.point(this.horizontalDirection, 1);
    mg.add(91, this.rowsCount);
    mg.add(92, this.columnsCount);
    for (let i = 0; i < this.rowsCount; i++)
      mg.add(141, this.rowsHeight[i] ?? this.rowsHeight[0] ?? 1);
    for (let i = 0; i < this.columnsCount; i++)
      mg.add(142, this.columnsHeight[i] ?? this.columnsHeight[0] ?? 1);
    this.cells.forEach((cell) => cell.tagify(mg));
  }
}
