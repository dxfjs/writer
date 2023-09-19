import {
  LWPolylineFlags,
  LWPolylineOptions,
  LWPolylineVertex,
} from "@/entities";
import { Point2D } from "@/types";
import { bulge } from "@/utils";

export interface RectangleOptions extends Omit<LWPolylineOptions, "vertices"> {
  origin: Point2D;
  width: number;
  height?: number;
  corner?: number | Point2D;
}

export class Rectangle {
  origin: Point2D;
  width: number;
  height: number;
  corner?: number | Point2D;

  constructor(options: RectangleOptions) {
    this.origin = options.origin;
    this.width = options.width;
    this.height = options.height ?? options.width;
    this.corner = options.corner;
    options.flags ||= LWPolylineFlags.None;
    options.flags |= LWPolylineFlags.Closed;
  }

  get vertices(): LWPolylineVertex[] {
    if (this.corner == null) return this._normal();
    else if (typeof this.corner === "number") {
      return this._rounded(this.corner);
    } else return this._chamfer(this.corner);
  }

  private _normal(): LWPolylineVertex[] {
    const { origin, width: w, height: h } = this;
    return [
      { x: origin.x, y: origin.y },
      { x: origin.x + w, y: origin.y },
      { x: origin.x + w, y: origin.y + h },
      { x: origin.x, y: origin.y + h },
    ];
  }

  private _rounded(c: number): LWPolylineVertex[] {
    const { origin, width: w, height: h } = this;
    const b = bulge(Math.PI / 2);
    return [
      { x: origin.x + c, y: origin.y },
      { x: origin.x + w - c, y: origin.y, bulge: b },
      { x: origin.x + w, y: origin.y + c },
      { x: origin.x + w, y: origin.y + h - c, bulge: b },
      { x: origin.x + w - c, y: origin.y + h },
      { x: origin.x + c, y: origin.y + h, bulge: b },
      { x: origin.x, y: origin.y + h - c },
      { x: origin.x, y: origin.y + c, bulge: b },
    ];
  }

  private _chamfer(c: Point2D) {
    const { origin, width: w, height: h } = this;
    return [
      { x: origin.x + c.x, y: origin.y },
      { x: origin.x + w - c.x, y: origin.y },
      { x: origin.x + w, y: origin.y + c.y },
      { x: origin.x + w, y: origin.y + h - c.y },
      { x: origin.x + w - c.x, y: origin.y + h },
      { x: origin.x + c.x, y: origin.y + h },
      { x: origin.x, y: origin.y + h - c.y },
      { x: origin.x, y: origin.y + c.y },
    ];
  }
}
