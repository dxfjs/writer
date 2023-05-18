import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox'
import Entity, { CommonEntityOptions } from './Entity'
import { RectangleOptions, bulge, point2d, vec2_t, vec3_t } from 'Internals/Helpers'
import { DxfBlockRecord } from 'TablesSection/Tables/Records/DxfBlockRecord'
import { DxfInterface } from 'Internals/Interfaces'
import { DxfObjectsSection } from 'ObjectsSection/DxfObjectsSection'
import { Dxfier } from 'Internals/Dxfier'
import Handle from 'Internals/Handle'
import * as Entities from './Entities'

export abstract class EntitiesManager implements DxfInterface {
  readonly blockRecord: DxfBlockRecord
  readonly entities: Entity[] = []
  readonly handle: string
  private readonly objects: DxfObjectsSection
  layerName: string

  constructor(objects: DxfObjectsSection, blockRecord: DxfBlockRecord, layerName: string) {
    this.handle = Handle.next()
    this.objects = objects
    this.blockRecord = blockRecord
    this.layerName = layerName
  }

  dxfy(dx: Dxfier): void {
    for (const entity of this.entities) {
      entity.dxfy(dx)
    }
  }

  addHatch(
    boundaryPath: Entities.HatchBoundaryPaths,
    fill: Entities.HatchPatternOptions_t | Entities.HatchGradientOptions_t,
    options?: Entities.HatchOptions_t
  ) {
    const hatch = new Entities.Hatch(boundaryPath, fill, options)
    return this.addEntity(hatch)
  }

  addEntity<T extends Entity>(entity: T): T {
    entity.ownerBlockRecord = this.blockRecord.handle
    if(this.blockRecord.isPaperSpace) entity.inPaperSpace = true
    if (entity.layerName == null) entity.layerName = this.layerName
    this.entities.push(entity)
    return entity
  }

  addAttrib(
    firstAlignmentPoint: vec3_t,
    height: number,
    tag: string,
    value: string,
    ownerInsert: Entities.Insert,
    options?: Entities.TextOptions
  ) {
    ownerInsert.attributesFollowFlag = 1
    const attrib = this.addEntity(
      new Entities.Attrib(firstAlignmentPoint, height, tag, value, options)
    )
    const seqEnd = this.addEntity(new Entities.SeqEnd())
    seqEnd.ownerBlockRecord = ownerInsert.handle
    return attrib
  }

  addAttdef(
    firstAlignmentPoint: vec3_t,
    height: number,
    tag: string,
    value: string,
    options?: Entities.TextOptions
  ) {
    return this.addEntity(
      new Entities.Attdef(firstAlignmentPoint, height, tag, value, options)
    )
  }

  addAlignedDim(
    first: vec3_t,
    second: vec3_t,
    options?: Entities.AlignedDimOptions
  ) {
    return this.addEntity(
      new Entities.AlignedDimension(first, second, options)
    )
  }

  addDiameterDim(
    first: vec3_t,
    second: vec3_t,
    options?: Entities.DiameterDimOptions
  ) {
    return this.addEntity(
      new Entities.DiameterDimension(first, second, options)
    )
  }

  addRadialDim(
    first: vec3_t,
    second: vec3_t,
    options?: Entities.RadialDimOptions
  ) {
    return this.addEntity(new Entities.RadialDimension(first, second, options))
  }

  addLinearDim(
    first: vec3_t,
    second: vec3_t,
    options?: Entities.LinearDimOptions
  ) {
    return this.addEntity(new Entities.LinearDimension(first, second, options))
  }

  addAngularLinesDim(
    first: Entities.DLine,
    second: Entities.DLine,
    location: vec3_t,
    options?: Entities.DimensionOptions
  ): Entities.AngularDimLines {
    return this.addEntity(
      new Entities.AngularDimLines(first, second, location, options)
    )
  }

  addAngularPointsDim(
    center: vec3_t,
    first: vec3_t,
    second: vec3_t,
    options?: Entities.DimensionOptions
  ): Entities.AngularDimPoints {
    return this.addEntity(
      new Entities.AngularDimPoints(center, first, second, options)
    )
  }

  addLine(
    startPoint: vec3_t,
    endPoint: vec3_t,
    options?: CommonEntityOptions
  ): Entities.Line {
    return this.addEntity(new Entities.Line(startPoint, endPoint, options))
  }

  addLeader(
    points: vec3_t[],
    options?: Entities.LeaderOptions
  ): Entities.Leader {
    return this.addEntity(new Entities.Leader(points, options))
  }

  addLWPolyline(
    points: Entities.LWPolylineVertex[],
    options?: Entities.LWPolylineOptions
  ): Entities.LWPolyline {
    return this.addEntity(new Entities.LWPolyline(points, options))
  }

  addRectangle(
    topLeft: vec2_t,
    bottomRight: vec2_t,
    options?: RectangleOptions
  ): Entities.LWPolyline {
    const vertices: Entities.LWPolylineVertex[] = []
    const tX = topLeft.x
    const tY = topLeft.y
    const bX = bottomRight.x
    const bY = bottomRight.y

    if (options?.fillet !== undefined && options?.chamfer !== undefined)
      throw new Error('You cannot define both fillet and chamfer!')

    if (options?.fillet !== undefined) {
      const f = options?.fillet
      const b = bulge(f)
      vertices.push({ point: point2d(tX, tY - f), bulge: b })
      vertices.push({ point: point2d(tX + f, tY) })
      vertices.push({ point: point2d(bX - f, tY), bulge: b })
      vertices.push({ point: point2d(bX, tY - f) })
      vertices.push({ point: point2d(bX, bY + f), bulge: b })
      vertices.push({ point: point2d(bX - f, bY) })
      vertices.push({ point: point2d(tX + f, bY), bulge: b })
      vertices.push({ point: point2d(tX, bY + f) })
    } else if (options?.chamfer !== undefined) {
      const f = options?.chamfer.first
      const s: number = options?.chamfer.second || f
      vertices.push({ point: point2d(tX, tY - f) })
      vertices.push({ point: point2d(tX + s, tY) })
      vertices.push({ point: point2d(bX - f, tY) })
      vertices.push({ point: point2d(bX, tY - s) })
      vertices.push({ point: point2d(bX, bY + f) })
      vertices.push({ point: point2d(bX - s, bY) })
      vertices.push({ point: point2d(tX + f, bY) })
      vertices.push({ point: point2d(tX, bY + s) })
    } else {
      vertices.push({ point: point2d(tX, tY) })
      vertices.push({ point: point2d(bX, tY) })
      vertices.push({ point: point2d(bX, bY) })
      vertices.push({ point: point2d(tX, bY) })
    }

    return this.addLWPolyline(vertices, {
      ...options,
      flags: Entities.LWPolylineFlags.Closed,
    })
  }

  addImage(
    imagePath: string,
    name: string,
    insertionPoint: vec3_t,
    width: number,
    height: number,
    scale: number,
    rotation: number,
    options?: Entities.ImageOptions_t
  ): Entities.Image {
    // TODO make sure there is no IMAGEDEF for this image!
    const imageDef = this.objects.addImageDef(imagePath)
    imageDef.width = width
    imageDef.height = height
    const image = new Entities.Image(
      {
        height,
        width,
        scale,
        rotation,
        insertionPoint,
        imageDefHandle: imageDef.handle,
      },
      options
    )
    const imageDefReactor = this.objects.addImageDefReactor(image.handle)
    image.imageDefReactorHandle = imageDefReactor.handle
    this.addEntity(image)
    const dictionary = this.objects.addDictionary()

    dictionary.addEntryObject(name, imageDef.handle)
    imageDef.ownerObjecthandle = dictionary.handle
    this.objects.root.addEntryObject('ACAD_IMAGE_DICT', dictionary.handle)
    imageDef.acadImageDictHandle = dictionary.handle
    imageDef.addImageDefReactorHandle(imageDefReactor.handle)
    return image
  }

  addPolyline3D(
    vertices: Entities.PolylineVertex[],
    options?: Entities.PolylineOptions
  ): Entities.Polyline {
    return this.addEntity(new Entities.Polyline(vertices, options))
  }

  addPoint(
    x: number,
    y: number,
    z: number,
    options?: CommonEntityOptions
  ): Entities.Point {
    return this.addEntity(new Entities.Point(x, y, z, options))
  }

  addCircle(
    center: vec3_t,
    radius: number,
    options?: CommonEntityOptions
  ): Entities.Circle {
    return this.addEntity(new Entities.Circle(center, radius, options))
  }

  addArc(
    center: vec3_t,
    radius: number,
    startAngle: number,
    endAngle: number,
    options?: CommonEntityOptions
  ): Entities.Arc {
    return this.addEntity(
      new Entities.Arc(center, radius, startAngle, endAngle, options)
    )
  }

  addSpline(
    splineArgs: Entities.SplineArgs_t,
    options?: CommonEntityOptions
  ): Entities.Spline {
    return this.addEntity(new Entities.Spline(splineArgs, options))
  }

  addEllipse(
    center: vec3_t,
    endPointOfMajorAxis: vec3_t,
    ratioOfMinorAxisToMajorAxis: number,
    startParameter: number,
    endParameter: number,
    options?: CommonEntityOptions
  ): Entities.Ellipse {
    const ellipse = new Entities.Ellipse(
      center,
      endPointOfMajorAxis,
      ratioOfMinorAxisToMajorAxis,
      startParameter,
      endParameter,
      options
    )
    this.addEntity(ellipse)
    return ellipse
  }

  add3dFace(
    firstCorner: vec3_t,
    secondCorner: vec3_t,
    thirdCorner: vec3_t,
    fourthCorner: vec3_t,
    options?: Entities.FaceOptions
  ): Entities.Face {
    return this.addEntity(
      new Entities.Face(
        firstCorner,
        secondCorner,
        thirdCorner,
        fourthCorner,
        options
      )
    )
  }

  addText(
    firstAlignementPoint: vec3_t,
    height: number,
    value: string,
    options?: Entities.TextOptions
  ): Entities.Text {
    return this.addEntity(
      new Entities.Text(firstAlignementPoint, height, value, options)
    )
  }

  addMText(
    firstAlignementPoint: vec3_t,
    height: number,
    value: string,
    options?: Entities.MTextOptions
  ): Entities.MText {
    return this.addEntity(
      new Entities.MText(firstAlignementPoint, height, value, options)
    )
  }

  addInsert(
    blockName: string,
    insertionPoint: vec3_t,
    options?: Entities.InsertOptions
  ): Entities.Insert {
    return this.addEntity(
      new Entities.Insert(blockName, insertionPoint, options || {})
    )
  }

  addTable(
    blockName: string,
    position: vec3_t,
    noOfRows: number,
    noOfColumn: number,
    rowHeights: number[],
    columnHeights: number[],
    tableOptions: Entities.TableOptions
  ) {
    return this.addEntity(
      new Entities.Table(
        blockName,
        position,
        noOfRows,
        noOfColumn,
        rowHeights,
        columnHeights,
        tableOptions
      )
    )
  }

  boundingBox(): boundingBox_t {
    const _bboxes = []
    for (let i = 0; i < this.entities.length; i++)
      _bboxes.push(this.entities[i].boundingBox())
    return BoundingBox.boundingBox(_bboxes)
  }

  centerView(): vec3_t {
    return BoundingBox.boundingBoxCenter(this.boundingBox())
  }

  viewHeight(): number {
    return BoundingBox.boundingBoxHeight(this.boundingBox())
  }
}
