import { describe, expect, it } from "vitest";

import { Spline } from "EntitiesSection/Entities/Spline";
import { Dxfier } from "Internals/Dxfier";
import { point3d } from "Internals/Helpers";

function valuesOf(dx: Dxfier, code: number) {
  return dx.lines.filter((_, i) => i % 2 === 1 && dx.lines[i - 1] === code);
}

describe("Spline", () => {
  const dataState = {
    instancesCount: 0,
  };
  it("should return the subClassName given.", () => {
    const points = [
      point3d(0, 0, 0),
      point3d(0, 10, 0),
      point3d(15, 15, 0),
      point3d(30, 10, 0),
      point3d(30, 0, 0),
    ];
    const entity = new Spline({ controlPoints: points }, {});
    dataState.instancesCount++;
    expect(entity.controlPoints.length).toBe(5);
  });

  it("should write the knot, control point and fit tolerances in groups 42, 43 and 44.", () => {
    const points = [
      point3d(0, 0, 0),
      point3d(1, 2, 0),
      point3d(3, 1, 0),
      point3d(4, 4, 0),
    ];
    const dx = new Dxfier();
    new Spline({ controlPoints: points, degreeCurve: 3 }, {}).dxfy(dx);
    expect(valuesOf(dx, 42)).toEqual(["0.0000001"]);
    expect(valuesOf(dx, 43)).toEqual(["0.0000001"]);
    expect(valuesOf(dx, 44)).toEqual(["0.0000000001"]);
  });
});
