import { Point2D, Point3D, Stringifiable } from "../types";

export class TagsManager implements Stringifiable {
  readonly lines: (string | number)[];

  constructor() {
    this.lines = [];
  }

  clear() {
    this.lines.length = 0;
  }

  add(code: number, value?: string | number) {
    if (value != null) this.lines.push(code, value);
  }

  sectionStart(name: string) {
    this.add(0, "SECTION");
    this.add(2, name);
  }

  sectionEnd() {
    this.add(0, "ENDSEC");
  }

  point2d(point?: Point2D, digit = 0) {
    if (point != null) {
      this.add(10 + digit, point.x);
      this.add(20 + digit, point.y);
    }
  }

  point(point?: Point3D, digit = 0) {
    if (point != null) {
      this.point2d(point, digit);
      this.add(30 + digit, point.z);
    }
  }

  stringify() {
    return this.lines.join("\u000A");
  }
}
