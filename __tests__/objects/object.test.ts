import { XHandle, XObject } from "../../src";

class DummyObject extends XObject {}

describe("XObject class", () => {
  it("should return existing application defined", () => {
    const dummy = new DummyObject("DICTIONARY", new XHandle());
    const reactors = dummy.addAppDefined("ACAD_REACTORS");
    expect(reactors).toBe(dummy.reactors);
  });
});
