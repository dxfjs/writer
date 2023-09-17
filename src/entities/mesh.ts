import { BBox, BoundingBox, Handle, TagsManager } from "@/utils";
import { Entity, EntityOptions } from "./entity";
import { Point3D } from "@/types";

export interface MeshOptions extends EntityOptions {
  vertices?: Point3D[];
  size?: number;
  faces?: number[][];
}

export class Mesh extends Entity {
  vertices: Point3D[];
  size: number;
  faces: number[][];
  edges?: [firstIndex: number, secondIndex: number][];

  override get subClassMarker(): string | undefined {
    return "AcDbSubDMesh";
  }

  constructor(options: MeshOptions, handle: Handle) {
    super("MESH", handle, options);
    this.vertices = options.vertices || [];
    this.size = options.size ?? 3;
    this.faces = options.faces || [];
  }

  override bbox(): BoundingBox {
    return BBox.points(this.vertices);
  }

  protected override tagifyChild(mg: TagsManager): void {
    mg.add(71, 2);
    mg.add(72, 0);
    mg.add(91, 0);
    mg.add(92, this.vertices.length);
    this.vertices.forEach((v) => mg.point(v));
    mg.add(93, this.faces.length * (this.size + 1));
    this.faces.forEach((f) => {
      mg.add(90, f.length);
      f.forEach((i) => mg.add(90, i));
    });
    mg.add(94, 0);
    mg.add(95, 0);
    mg.add(90, 0);
  }
}
