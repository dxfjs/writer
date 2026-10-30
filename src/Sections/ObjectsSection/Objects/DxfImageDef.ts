import type { Dxfier } from "Internals/Dxfier";
import { point2d } from "Internals/Helpers";
import { DxfObject } from "../DxfObject";

export enum ImageDefResolutionUnits {
  NoUnits = 0,
  Centimeters = 2,
  Inch = 5,
}

export class DxfImageDef extends DxfObject {
  classVersion: number;
  path: string;
  /** The picture's size in pixels. */
  width: number;
  height: number;
  /** One pixel's size in AutoCAD units, the image's size before it is scaled. */
  widthPixelSize: number;
  heightPixelSize: number;
  loaded: boolean;
  resolutionUnits: ImageDefResolutionUnits;

  constructor(path: string, width: number, height: number) {
    super("IMAGEDEF");
    this.classVersion = 0;
    this.path = path;
    this.width = width;
    this.height = height;
    this.widthPixelSize = 1;
    this.heightPixelSize = 1;
    this.loaded = true;
    this.resolutionUnits = ImageDefResolutionUnits.NoUnits;
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx);
    dx.subclassMarker("AcDbRasterImageDef");
    dx.push(90, this.classVersion);
    dx.push(1, this.path);
    dx.point2d(point2d(this.width, this.height));
    dx.push(11, this.widthPixelSize);
    dx.push(21, this.heightPixelSize);
    dx.push(280, Number(this.loaded));
    dx.push(281, this.resolutionUnits);
  }
}
