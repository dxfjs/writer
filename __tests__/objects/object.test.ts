import { Seeder, XObject } from "@/index";

class DummyObject extends XObject {
  constructor() {
    super({ seeder: new Seeder(), type: "DICTIONARY" });
  }
}

describe("XObject class", () => {
  it("should return existing application defined", () => {
    const dummy = new DummyObject();
    const reactors = dummy.addAppDefined("ACAD_REACTORS");
    expect(reactors).toBe(dummy.reactors);
  });
});
