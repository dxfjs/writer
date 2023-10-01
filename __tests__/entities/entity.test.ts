import { Entity, Seeder, TagsManager } from "@/index";

class DummyEntity extends Entity {
  override get subClassMarker(): string | undefined {
    return;
  }

  constructor() {
    super({ seeder: new Seeder() });
    this._type = "LINE";
  }

  protected override tagifyChild(): void {}
}

describe("Entity class", () => {
  it("should have the default values", () => {
    const dummy = new DummyEntity();
    const xdata = dummy.addXData("XDATA_TEST");
    xdata.layerName("0");
    const mg = new TagsManager();
    dummy.tagify(mg);
    dummy.proxyEntityGraphics = "test";
    mg.clear();
    dummy.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });

  it("should return the visibility", () => {
    const dummy = new DummyEntity();
    expect(dummy.visibility).toBeUndefined();
    dummy.visible = false;
    expect(dummy.visibility).toBe(1);
    dummy.visible = true;
    expect(dummy.visibility).toBe(0);
  });

  it("should return existing defined application", () => {
    const dummy = new DummyEntity();
    const reactors = dummy.addAppDefined("ACAD_REACTORS");
    const xdictionary = dummy.addAppDefined("ACAD_XDICTIONARY");
    expect(reactors.name).toBe("ACAD_REACTORS");
    expect(xdictionary.name).toBe("ACAD_XDICTIONARY");
    expect(reactors).toBe(dummy.reactors);
    expect(xdictionary).toBe(dummy.xdictionary);
  });

  it("should create new defined application", () => {
    const dummy = new DummyEntity();
    const test = dummy.addAppDefined("ACAD_TEST");
    expect(test.name).toBe("ACAD_TEST");
  });

  it("should create new XData", () => {
    const dummy = new DummyEntity();
    const xdata = dummy.addXData("XDATA_TEST");
    expect(xdata.name).toBe("XDATA_TEST");
    const test = dummy.addXData("XDATA_TEST");
    expect(test).toBe(xdata);
  });
});
