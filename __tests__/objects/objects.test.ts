import { XHandle, XObjects, XTagsManager } from "../../src";

describe("XObjects class", () => {
  it("should create an objects section", () => {
    const objects = new XObjects(new XHandle());
    const mg = new XTagsManager();
    objects.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
