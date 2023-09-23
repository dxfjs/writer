import {
  angle,
  extrusion,
  onezero,
  openUniformKnots,
  point,
  point2d,
  stringByteSize,
  stringChunksSplit,
  tag,
  uniformKnots,
} from "@/index";

describe("point function", () => {
  it("should create a 3d point object", () => {
    expect(point()).toEqual({ x: 0, y: 0, z: 0 });
    expect(point(10, 3, 2)).toEqual({ x: 10, y: 3, z: 2 });
  });
});

describe("point2d function", () => {
  it("should create a 2d point object", () => {
    expect(point2d()).toEqual({ x: 0, y: 0 });
    expect(point2d(10, 3)).toEqual({ x: 10, y: 3 });
  });
});

describe("tag function", () => {
  it("should create tag object", () => {
    expect(tag(0, "SECTION")).toEqual({ code: 0, value: "SECTION" });
  });
});

describe("stringByteSize function", () => {
  it("should return the byte size of a string", () => {
    expect(stringByteSize("SECTION")).toBe(7);
  });
});

describe("stringChunksSplit function", () => {
  it("should return string chunks of 255 length or less", () => {
    const chunks = stringChunksSplit(
      "623B4FEEA4082C0100001202000031000000000000000000000000005A0500006662782F39464131463745442D413632322D343644302D413938332D3331353338454246344243312F636F72652E786D6C504B01021400140006080800CC70623BAD7543B64E010000330300003000000000000000000000000000D50600006662782F39464131463745442D413632322D343644302D413938332D3331353338454246344243312F636E782E786D6C504B01021400140006080800CC70623B16AB87BA640500003C1000003400000000000000000000000000710800006662782F39464131463745442D413632322D343644302D413938332D3331353338454246344243312F6F626A656374732E786D6C504B01021400140006080000CC70623B0000000000000000000000003500000000000000000000000000270E00006662782F39464131463745442D413632322D343644302D413938332D3331353338454246344243312F76657274696365732E62696E504B01021400140006080800CC70623BF270F133060000000400000036000000000000000000000000007A0E00006662782F39464131463745442D413632322D343644302D413938332D3331353338454246344243312F747269616E676C65732E62696E504B01021400140006080000CC70623B0000000000000000000000003700000000000000000000000000D40E00006662782F39464131463745442D413632322D343644302D413938332D3331353338454246344243312F617474726962757465732E62696E504B01021400140006080800CC70623B08DA0BD190000000410100003600000000000000000000000000290F00006662782F39464131463745442D413632322D343644302D413938332D3331353338454246344243312F6469726563746F72792E786D6C504B01021400140006080800CC70623B0D6EF93BFE000000A00100003B000000000000000000000000000D1000006662782F39464131463745442D413632322D343644302D413938332D3331353338454246344243312F7265736F75726365732F636F72652E786D6C504B0506000000000E000E0080040000641100000000"
    );
    chunks.forEach((chunk, i) => {
      if (i === chunks.length - 1) {
        expect(chunk.length).toBeLessThanOrEqual(255);
      } else {
        expect(chunk.length).toBe(255);
      }
    });
  });
});

describe("extrusion function", () => {
  it("should return the extrusion object", () => {
    expect(extrusion()).toEqual({ x: 0, y: 0, z: 1 });
  });
});

describe("openUniformKnots function", () => {
  it("should return the correct knot vector", () => {
    expect(openUniformKnots(7, 3)).toEqual([0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4]);
  });
});

describe("uniformKnots function", () => {
  it("should return the correct knot vector", () => {
    expect(uniformKnots(7, 3)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});

describe("angle function", () => {
  it("should return the correct angle", () => {
    expect(angle(point(), point(10, 10))).toBe(45);
    expect(angle(point(), point(-10, -10))).toBe(225);
  });
});

describe("onezero function", () => {
  it("should return 1 or 0", () => {
    expect(onezero()).toBeUndefined();
    expect(onezero(false)).toBe(0);
    expect(onezero(undefined)).toBeUndefined();
    expect(onezero(true)).toBe(1);
  });
});
