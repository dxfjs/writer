import { XHandle } from "../../src";

describe("XHandle class", () => {
  const handle = new XHandle();
  it("should return the next handle", () => {
    expect(handle.next()).toBe("1");
    expect(handle.next()).toBe("2");
    expect(handle.next()).toBe("3");
  });

  it("should return the next handle without increment", () => {
    expect(handle.peek()).toBe("4");
    expect(handle.peek()).toBe("4");
    expect(handle.peek()).toBe("4");
  });

  it("should return the correct hex value", () => {
    const handle = new XHandle();
    for (let i = 0; i < 42; i++) handle.next();
    expect(handle.next()).toBe("2B");
    expect(handle.next()).toBe("2C");
  });
});