import { HALF_PI, PI, TOW_PI, angleBetween, calculateAngle } from "@/helpers";
import { point2d } from "@/utils";

describe("between function", () => {
  it("should return the correct value", () => {
    expect(angleBetween(45, 0, 90)).toBeTruthy();
    expect(angleBetween(45, 90, 0)).toBeFalsy();
    expect(angleBetween(45, 350, 90)).toBeTruthy();
    expect(angleBetween(-10, -90, 90)).toBeTruthy();
    expect(angleBetween(-10, 90, -30)).toBeFalsy();

    expect(angleBetween(HALF_PI, 0, TOW_PI, true)).toBeTruthy();
    expect(angleBetween(HALF_PI + TOW_PI, 0, TOW_PI, true)).toBeTruthy();
  });
});

describe("calculateAngle function", () => {
  it("should calculate correct value", () => {
    expect(calculateAngle(point2d(), point2d(-100, 0))).toBe(PI);
    expect(calculateAngle(point2d(), point2d(100, 0))).toBe(0);
  });
});
