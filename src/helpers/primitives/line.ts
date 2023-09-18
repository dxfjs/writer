import { Block, Point2D, point } from "@/index";
import { Vector, Writable, rotate } from "@/helpers";

export class LinePrimitive implements Writable {
  start: Vector;
  end: Vector;

  get vector(): Vector {
    return Vector.from(this.start, this.end);
  }

  get middle(): Vector {
    return this.start.add(this.end).scale(0.5);
  }

  constructor(start: Point2D, end: Point2D) {
    this.start = new Vector(start.x, start.y);
    this.end = new Vector(end.x, end.y);
  }

  rotate(center: Point2D, angle: number) {
    return new LinePrimitive(
      rotate({ target: this.start, center, angle }),
      rotate({ target: this.end, center, angle })
    );
  }

  intersect(rhs: LinePrimitive): Vector | null {
    const fv = this.vector;
    const sv = rhs.vector;
    const tv = Vector.from(this.start, rhs.start);

    const cross = fv.cross(sv);
    if (cross === 0) return null;

    const t = tv.cross(sv) / cross;
    return this.start.add(fv.scale(t));
  }

  write<B extends Block>(block: B) {
    const start = point(this.start.x, this.start.y);
    const end = point(this.end.x, this.end.y);
    return block.addLine({ start, end });
  }
}
