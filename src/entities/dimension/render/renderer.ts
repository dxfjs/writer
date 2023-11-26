import { AlignedDimension, AngularLinesDimension, AttachmentPoint, arrow } from "@/entities";
import { ArcPrimitive, LinePrimitive, PI, calculateAngle, linep } from "@/helpers";
import { Block, Blocks } from "@/blocks";
import { Seeder, angle, deg, point, polar } from "@/utils";
import { Tables } from "@/tables";
import { WithSeeder } from "@/types";

function round(v: number, accuracy = 0.01) {
  const EPSILON = Number.EPSILON || Math.pow(2, -52);
  const temp = 1 / accuracy;
  return Math.round((v + EPSILON) * temp) / temp;
}

export interface DimensionRendererOptions extends WithSeeder {
  blocks: Blocks;
  tables: Tables;
}

export class DimensionRenderer implements WithSeeder {
  readonly seeder: Seeder;
  readonly blocks: Blocks;
  readonly tables: Tables;

  private _seed: number;
  private get _blockName() {
    return `*D${++this._seed}`;
  }

  constructor(options: DimensionRendererOptions) {
    this.seeder = options.seeder;
    this.blocks = options.blocks;
    this.tables = options.tables;
    this._seed = 0;
  }

  aligned(dim: AlignedDimension) {
    const { seeder } = this.blocks;
    const rotation = calculateAngle(dim.start, dim.end);
    const sign = Math.sign(dim.offset);
    const block = this.blocks.addBlock({ name: this._blockName });
    block.currentLayerName = dim.layerName || "0";
    const angle = rotation + (PI / 2) * sign;
    const start = polar(dim.start, deg(angle), dim.offset);
    const end = polar(dim.end, deg(angle), dim.offset);
    block.push(arrow({ seeder, rotation: rotation - PI, position: start }));
    block.push(arrow({ seeder, rotation, position: end }));
    linep(start, end).trimStart(2.5).trimEnd(2.5).write(block);
    this._trimExpand(linep(dim.start, start), block);
    this._trimExpand(linep(dim.end, end), block);
    const layerName = this.tables.addDefpointsLayer();
    block.addPoint({ ...dim.start, layerName });
    block.addPoint({ ...dim.end, layerName });

    const distance = round(linep(dim.start, dim.end).length);
    const middle = linep(start, end).middle;

    dim.textRotation = deg(rotation);
    dim.measurement = distance;
    dim.middle = polar(middle, 90 * sign, 1.25);
    block.addMText({
      insertionPoint: dim.middle,
      height: 2.5,
      value: distance.toString(),
      rotation: deg(rotation),
      attachmentPoint: AttachmentPoint.BottomCenter,
    });

    dim.blockName = block.name;
  }

  angularLines(dim: AngularLinesDimension) {
    const { seeder } = this.blocks;
    const block = this.blocks.addBlock({ name: this._blockName });
    block.currentLayerName = dim.layerName || "0";
    const fline = linep(dim.firstLine.start, dim.firstLine.end);
    const sline = linep(dim.secondLine.start, dim.secondLine.end);
    const intersection = fline.intersect(sline);
    if (intersection == null) return;
    const center = point(intersection.x, intersection.y);
    const radius = linep(center, dim.positionArc).length;
    const startAngle = angle(dim.firstLine.start, dim.firstLine.end);
    const endAngle = angle(dim.secondLine.start, dim.secondLine.end);
    const arc = new ArcPrimitive({ center, endAngle, startAngle, radius });
    const tarc = arc.trimStart(2.5, true).trimEnd(2.5, true);
    tarc.write(block);
    block.push(arrow({
      seeder,
      rotation: calculateAngle(tarc.start, arc.start),
      position: arc.start
    }));
    block.push(arrow({
      seeder,
      rotation: calculateAngle(tarc.end, arc.end),
      position: arc.end
    }));
    dim.middle = polar(arc.middle, arc.middleAngle, 1.25);
    block.addMText({
      insertionPoint: dim.middle,
      height: 2.5,
      value: `${arc.angle.toFixed(2)}°`,
      rotation: arc.middleAngle - 90,
      attachmentPoint: AttachmentPoint.BottomCenter,
    });

    if (fline.length <= radius) {
      this._trimExpand(linep(fline.end, arc.start), block);
    }

    if (sline.length <= radius) {
      this._trimExpand(linep(sline.end, arc.end), block);
    }

    dim.blockName = block.name;
  }

  private _trimExpand(line: LinePrimitive, block: Block) {
    line.trimStart(0.625).expandEnd(1.25).write(block);
  }
}
