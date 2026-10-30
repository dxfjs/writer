import type { Dxfier } from "Internals/Dxfier";
import { DxfObject } from "../DxfObject";

export enum ImageFrame {
  Hidden = 0,
  Shown = 1,
  NotPlotted = 2,
}

export enum ImageQuality {
  Draft = 0,
  High = 1,
}

/** The unit AutoCAD gives an image whose file names none. */
export enum ImageUnits {
  None = 0,
  Millimeters = 1,
  Centimeters = 2,
  Meters = 3,
  Kilometers = 4,
  Inches = 5,
  Feet = 6,
  Yards = 7,
  Miles = 8,
}

/** The settings every image of the drawing shares, under ACAD_IMAGE_VARS. */
export class DxfRasterVariables extends DxfObject {
  classVersion: number;
  frame: ImageFrame;
  quality: ImageQuality;
  units: ImageUnits;

  constructor() {
    super("RASTERVARIABLES");
    this.classVersion = 0;
    this.frame = ImageFrame.Shown;
    this.quality = ImageQuality.High;
    this.units = ImageUnits.None;
  }

  override dxfy(dx: Dxfier): void {
    super.dxfy(dx);
    dx.subclassMarker("AcDbRasterVariables");
    dx.push(90, this.classVersion);
    dx.push(70, this.frame);
    dx.push(71, this.quality);
    dx.push(72, this.units);
  }
}
