import { Entry, Seeder } from "@/index";

class DummyEntry extends Entry {
  constructor() {
    super({
      seeder: new Seeder(),
      type: "DUMMY",
    });
  }
}

describe("Entry class", () => {
  it("should have reactors and xdictionary", () => {
    const dummy = new DummyEntry();
    const reactors = dummy.reactors;
    const xdictionary = dummy.xdictionary;

    const foundReactors = dummy.addAppDefined("ACAD_REACTORS");
    const foundXDictionary = dummy.addAppDefined("ACAD_XDICTIONARY");

    expect(reactors).toBe(foundReactors);
    expect(xdictionary).toBe(foundXDictionary);
  });
});
