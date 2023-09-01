import { XData, TagsManager, point } from "../../src";

describe("XData class", () => {
  it("should create an empty xdata", () => {
    const application = new XData("ACAD");
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe("1001\nACAD\n1002\n{\n1002\n}");
  });

  it("should add string", () => {
    const application = new XData("ACAD");
    application.string("test");
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1000\ntest\n1002\n}"
    );
  });

  it("should add layer name", () => {
    const application = new XData("ACAD");
    application.layerName("test");
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1003\ntest\n1002\n}"
    );
  });

  it("should add binary data", () => {
    const application = new XData("ACAD");
    application.binaryData("test");
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1004\ntest\n1002\n}"
    );
  });

  it("should add database handle", () => {
    const application = new XData("ACAD");
    application.databaseHandle("1A");
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1005\n1A\n1002\n}"
    );
  });

  it("should add a point", () => {
    const application = new XData("ACAD");
    application.point(point(99, 99, 99));
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1010\n99\n1020\n99\n1030\n99\n1002\n}"
    );
  });

  it("should add a position", () => {
    const application = new XData("ACAD");
    application.position(point(99, 99, 99));
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1011\n99\n1021\n99\n1031\n99\n1002\n}"
    );
  });

  it("should add a displacement", () => {
    const application = new XData("ACAD");
    application.displacement(point(99, 99, 99));
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1012\n99\n1022\n99\n1032\n99\n1002\n}"
    );
  });

  it("should add a direction", () => {
    const application = new XData("ACAD");
    application.direction(point(99, 99, 99));
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1013\n99\n1023\n99\n1033\n99\n1002\n}"
    );
  });

  it("should add a real", () => {
    const application = new XData("ACAD");
    application.real(35.2);
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1040\n35.2\n1002\n}"
    );
  });

  it("should add a distance", () => {
    const application = new XData("ACAD");
    application.distance(35.2);
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1041\n35.2\n1002\n}"
    );
  });

  it("should add a scale", () => {
    const application = new XData("ACAD");
    application.scale(2);
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1042\n2\n1002\n}"
    );
  });

  it("should add a integer", () => {
    const application = new XData("ACAD");
    application.integer(100);
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1070\n100\n1002\n}"
    );
  });

  it("should add a long", () => {
    const application = new XData("ACAD");
    application.long(Number.MAX_SAFE_INTEGER);
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1071\n9007199254740991\n1002\n}"
    );
  });

  it("should begin and end list", () => {
    const application = new XData("ACAD");
    application.beginList();
    application.long(Number.MAX_SAFE_INTEGER);
    application.endList();
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe(
      "1001\nACAD\n1002\n{\n1002\n{\n1071\n9007199254740991\n1002\n}\n1002\n}"
    );
  });

  it("should clear all values", () => {
    const application = new XData("ACAD");
    application.beginList();
    application.long(Number.MAX_SAFE_INTEGER);
    application.endList();
    application.clear();
    const mg = new TagsManager();
    application.tagify(mg);
    expect(mg.stringify()).toBe("1001\nACAD\n1002\n{\n1002\n}");
  });
});
