import { Point2D, Point3D, Stringifiable } from "@/types";
import { replaceLineBreaks } from "./functions";

export class TagsManager implements Stringifiable {
  readonly lines: (string | number)[];

  constructor() {
    this.lines = [];
  }

  clear() {
    this.lines.length = 0;
  }

  /**
   * Adds a group: its code, then its value. A line break in a string value
   * is written as a space, since a value that ran onto a second line would be
   * read as the next group code.
   */
  add(code: number, value?: string | number) {
    if (value == null) return;
    if (typeof value === "string") {
      this.lines.push(code, replaceLineBreaks(value, " "));
    } else this.lines.push(code, value);
  }

  sectionStart(name: string) {
    this.add(0, "SECTION");
    this.add(2, name);
  }

  sectionEnd() {
    this.add(0, "ENDSEC");
  }

  point2d(point?: Point2D, digit = 0) {
    if (point == null) return;
    this.add(10 + digit, point.x);
    this.add(20 + digit, point.y);
  }

  point(point?: Point3D, digit = 0) {
    if (point == null) return;
    this.point2d(point, digit);
    this.add(30 + digit, point.z);
  }

  stringify() {
    return this.lines.join("\u000A");
  }
}
