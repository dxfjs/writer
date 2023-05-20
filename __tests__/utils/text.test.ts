import { Colors, XStyledText, XTextBuilder } from "../../src";

describe("XStyledText class", () => {
  it("should create a styled text", () => {
    const styledText = new XStyledText();
    styledText.add({
      value: "Hello World!",
      fontFamily: "Arial",
      italic: true,
      colorNumber: Colors.Red,
      underline: true,
      center: true,
      bold: true,
    });
    expect(styledText.value).toBe("{\\L\\C1;\\fArial|b1|i1|c1;Hello World!}");
    styledText.paragraph = true;
    expect(styledText.value).toBe(
      "{\\L\\C1;\\fArial|b1|i1|c1;Hello World!}\\P"
    );
  });

  it("should return an empty string", () => {
    const styledText = new XStyledText();
    styledText.add({
      value: "",
      fontFamily: "Arial",
      italic: true,
      colorNumber: Colors.Red,
      underline: true,
      center: true,
      bold: true,
    });
    expect(styledText.value).toBe("");
  });
});

describe("XTextBuilder class", () => {
  it("should create a text builder", () => {
    const builder = new XTextBuilder();
    const p1 = builder.add(
      {
        value: "Hello",
        fontFamily: "Arial",
        italic: true,
      },
      true
    );
    p1.add({
      value: " Hello",
      colorNumber: Colors.Red,
    });
    const p2 = builder.add({
      value: "Hello",
      italic: true,
      colorNumber: Colors.Green,
    });
    p2.add({
      value: " Hello",
      colorNumber: Colors.Yellow,
    });
    expect(builder.value).toBe(
      "{\\fArial|i1;Hello\\C1; Hello}\\P{\\C3;|i1;Hello\\C2; Hello}"
    );
  });
});
