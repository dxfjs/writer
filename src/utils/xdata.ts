import { Point3D, Tag, Taggable } from "@/types";
import { stringChunksSplit, tag } from "./functions";
import { TagsManager } from "./tags";

export class XData implements Taggable {
  readonly tags: Tag[];

  constructor(public readonly name: string) {
    this.tags = [];
  }

  private xpoint(point: Point3D, digit = 0) {
    this.tags.push(tag(1010 + digit, point.x));
    this.tags.push(tag(1020 + digit, point.y));
    this.tags.push(tag(1030 + digit, point.z));
  }

  clear() {
    this.tags.length = 0;
  }

  string(string: string) {
    stringChunksSplit(string).forEach((chunk) =>
      this.tags.push(tag(1000, chunk))
    );
  }

  beginList() {
    this.tags.push(tag(1002, "{"));
  }

  endList() {
    this.tags.push(tag(1002, "}"));
  }

  layerName(name: string) {
    this.tags.push(tag(1003, name));
  }

  binaryData(data: string) {
    stringChunksSplit(data).forEach((chunk) =>
      this.tags.push(tag(1004, chunk))
    );
  }

  databaseHandle(handleSeed: string) {
    this.tags.push(tag(1005, handleSeed));
  }

  point(point: Point3D) {
    this.xpoint(point);
  }

  position(position: Point3D) {
    this.xpoint(position, 1);
  }

  displacement(displacement: Point3D) {
    this.xpoint(displacement, 2);
  }

  direction(direction: Point3D) {
    this.xpoint(direction, 3);
  }

  real(real: number) {
    this.tags.push(tag(1040, real));
  }

  distance(distance: number) {
    this.tags.push(tag(1041, distance));
  }

  scale(scale: number) {
    this.tags.push(tag(1042, scale));
  }

  integer(integer: number) {
    this.tags.push(tag(1070, integer));
  }

  long(long: number) {
    this.tags.push(tag(1071, long));
  }

  tagify(mg: TagsManager): void {
    mg.add(1001, this.name);
    mg.add(1002, "{");
    this.tags.forEach((t) => mg.add(t.code, t.value));
    mg.add(1002, "}");
  }
}
