import { TagsManager, Variable } from "../../src";

describe("XVariable class", () => {
  it("should create an empty variable", () => {
    const version = new Variable("$ACADVER");
    const mg = new TagsManager();
    version.tagify(mg);
    expect(mg.stringify()).toBe("");
  });

  it("should be able to add a value", () => {
    const version = new Variable("$ACADVER");
    version.add(1, "AC1021");
    const mg = new TagsManager();
    version.tagify(mg);
    expect(mg.stringify()).toBe("9\n$ACADVER\n1\nAC1021");
  });

  it("should be able to clear the values", () => {
    const version = new Variable("$ACADVER");
    version.add(1, "AC1021");
    version.clear();
    const mg = new TagsManager();
    version.tagify(mg);
    expect(mg.stringify()).toBe("");
  });
});
