import Entity, { CommonEntityOptions } from "EntitiesSection/Entity";
import { Dxfier } from "Internals/Dxfier";
import { BoundingBox, boundingBox_t, point3d, vec3_t } from "index";

export interface TableOptions extends CommonEntityOptions {
  horizontalDirectionVector: vec3_t

  cell: cell[]
}

export enum CellType {
  Text = 1,
  Block = 2,
}

export enum CellMerged {
  False = 0,
  True = 1,
}

export interface CellOptions extends CommonEntityOptions {
  cellType: CellType
  cellMerged: CellMerged
  cellBorderWidth: number
  cellBorderHeight: number
  cellRotationValue: number
  cellText: string
}

export class Cell {
  cellType: CellType
  cellMerged: CellMerged
  cellBorderWidth: number
  cellBorderHeight: number
  cellRotationValue: number
  cellText: string

  constructor(options: CellOptions) {
    this.cellType = options?.cellType ?? CellType.Text
    this.cellMerged = options?.cellMerged ?? CellMerged.False
    this.cellBorderWidth = options?.cellBorderWidth ?? 1
    this.cellBorderHeight = options?.cellBorderHeight ?? 1
    this.cellRotationValue = options?.cellRotationValue ?? 0
    this.cellText = options?.cellText
    console.log('this: ', this)
  }

}

export class Table extends Entity {
  blockName: string
  position: vec3_t
  noOfRows: number
  noOfColumn: number
  horizontalDirectionVector: vec3_t
  rowHeights: number[]
  columnHeights: number[]
  cells: cell[]

  constructor(blockName: string, position: vec3_t, noOfRows: number, noOfColumn: number, rowHeights: number[], columnHeights: number[], tableOptions: TableOptions) {
    super('ACAD_TABLE', 'AcDbBlockReference', tableOptions)
    this.blockName = blockName
    this.position = position
    this.noOfRows = noOfRows
    this.noOfColumn = noOfColumn
    this.rowHeights = rowHeights
    this.columnHeights = columnHeights
    this.horizontalDirectionVector = tableOptions?.horizontalDirectionVector ?? point3d(1, 0, 0)
    this.cells = tableOptions?.cell
    console.log('this: ', this)
  }

//   override boundingBox(): boundingBox_t {
//     return BoundingBox.pointBBox(this.position)
//   }

//   override dxfy(dx: Dxfier): void {
//     super.dxfy(dx)
//   }
}