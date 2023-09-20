import { Handle, Header, TagsManager } from "@/index";

describe("XHeader class", () => {
  it("should create a header section with defaults", () => {
    const header = new Header(new Handle());
    const mg = new TagsManager();
    header.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });

  it("should be able to add a variable", () => {
    const header = new Header(new Handle());
    expect(header.exists("$ANGDIR")).toBeFalsy();
    const angleDirection = header.add("$ANGDIR");
    angleDirection.add(70, 0);
    expect(header.exists("$ANGDIR")).toBeTruthy();
    const test = header.add("$ANGDIR");
    expect(test).toBe(angleDirection);
    const mg = new TagsManager();
    header.tagify(mg);
    expect(mg.stringify()).toMatchSnapshot();
  });
});
