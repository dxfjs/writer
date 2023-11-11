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
  options: RectangleOptions;

  constructor(options: RectangleOptions) {
    this.options = options;
    options.flags ??= LWPolylineFlags.None;
    options.flags |= LWPolylineFlags.Closed;
  }

  get lwpolylineOptions(): LWPolylineOptions {
    const { options, vertices } = this;
    return { ...options, vertices };
  }

  get vertices(): LWPolylineVertex[] {
    const { corner } = this.options;
    if (corner == null) return this._normal();
    else if (typeof corner === "number") {
      return this._rounded(corner);
    } else return this._chamfer(corner);
  }

  private _normal(): LWPolylineVertex[] {
    const { origin, width: w, height } = this.options;
    const h = height ?? w;
    return [
      { x: origin.x, y: origin.y },
      { x: origin.x + w, y: origin.y },
      { x: origin.x + w, y: origin.y + h },
      { x: origin.x, y: origin.y + h },
    ];
  }

  private _rounded(c: number): LWPolylineVertex[] {
    const { origin, width: w, height } = this.options;
    const h = height ?? w;
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
    const { origin, width: w, height } = this.options;
    const h = height ?? w;
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
