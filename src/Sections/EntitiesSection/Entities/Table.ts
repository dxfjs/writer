import Entity, { CommonEntityOptions } from "EntitiesSection/Entity";
import { Dxfier } from "Internals/Dxfier";
import { BoundingBox, boundingBox_t, point3d, vec3_t } from "index";

export interface TableOptions extends CommonEntityOptions {
  horizontalDirectionVector: vec3_t

  cell: Cell[]
}

export enum CellType {
  Text = 1,
  Block = 2,
}

export enum CellMerged {
  False = 0,
  True = 1,
}

export enum CellAutoFitFlag {
    False = 0,
    True = 1,
}

export interface CellOptions extends CommonEntityOptions {
  cellType: CellType
  cellMerged: CellMerged
  cellAutoFitFlag: CellAutoFitFlag
  cellBorderWidth: number
  cellBorderHeight: number
  cellRotationValue: number
  cellText: string
}

export class Cell {
  cellType: CellType
  cellMerged: CellMerged
  cellAutoFitFlag: CellAutoFitFlag
  cellBorderWidth: number
  cellBorderHeight: number
  cellRotationValue: number
  cellText: string

  constructor(options: CellOptions) {
    this.cellType = options?.cellType ?? CellType.Text
    this.cellMerged = options?.cellMerged ?? CellMerged.False
    this.cellAutoFitFlag = options?.cellAutoFitFlag ?? CellAutoFitFlag.False
    this.cellBorderWidth = options?.cellBorderWidth ?? 1
    this.cellBorderHeight = options?.cellBorderHeight ?? 1
    this.cellRotationValue = options?.cellRotationValue ?? 0
    this.cellText = options?.cellText
  }

  dxfy(dx) {
    dx.push(171, this.cellType)
    dx.push(173, this.cellMerged)
    dx.push(174, this.cellAutoFitFlag)
    dx.push(175, this.cellBorderWidth)
    dx.push(176, this.cellBorderHeight)
    dx.push(145, this.cellRotationValue)
    dx.push(301, 'CELL_VALUE')
    dx.push(90, this.cellText ? 4 : 0)
    dx.push(1, this.cellText)
    dx.push(300, '')
    dx.push(302, this.cellText ?? '')
    dx.push(304, 'ACVALUE_END')
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
  cells: Cell[]

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
  }

  override boundingBox(): boundingBox_t {
    return BoundingBox.pointBBox(this.position)
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx)
    dx.name(this.blockName)
    dx.point3d(this.position)
    dx.push(100, 'AcDbTable')
    dx.push(11, this.horizontalDirectionVector.x)
    dx.push(21, this.horizontalDirectionVector.y)
    dx.push(31, this.horizontalDirectionVector.z)
    dx.push(91, this.noOfRows)
    dx.push(92, this.noOfColumn)
    for (let i = 0; i < this.noOfRows; i++) {
      dx.push(141, this.rowHeights[i] ?? this.rowHeights[0] ?? 1)
    }
    for (let i = 0; i < this.noOfColumn; i++) {
      dx.push(142, this.columnHeights[i] ?? this.columnHeights[0] ?? 1)
    }
    this.cells.forEach((cell) => {
      cell.dxfy(dx)
    })

  }
}