import { TrueColor } from "@/utils";

describe("TrueColor class", () => {
  it("should return the correct true color value", () => {
    expect(TrueColor.fromRGB(200, 100, 50)).toBe(13132850);
    expect(TrueColor.fromRGB(1, 100, 50)).toBe(91186);
  });
});
