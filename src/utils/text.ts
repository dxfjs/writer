export interface StyledTextOptions {
  value: string;
  fontFamily?: string;
  bold?: boolean;
  italic?: boolean;
  colorNumber?: number;
  underline?: boolean;
  center?: boolean;
}

export class StyledText {
  private text: string;
  paragraph: boolean;

  get value(): string {
    if (this.text === "") return "";
    let value = `{${this.text}}`;
    if (this.paragraph) value += "\\P";
    return value;
  }

  constructor(paragraph?: boolean) {
    this.paragraph = paragraph || false;
    this.text = "";
  }

  add(options?: StyledTextOptions) {
    if (!options || options.value === "") return;

    let font = "";
    let style = "";

    if (options.fontFamily) font += `\\f${options.fontFamily}`;
    if (options.bold) font += "|b1";
    if (options.italic) font += "|i1";
    if (options.center) font += "|c1";
    if (font !== "") font += ";";

    if (options.underline) style += "\\L";
    if (options.colorNumber) style += `\\C${options.colorNumber}`;
    if (style !== "") style += ";";

    this.text += `${style}${font}${options.value}`;
  }
}

export class TextBuilder {
  readonly texts: StyledText[];

  get value(): string {
    return this.texts.map((t) => t.value).join("");
  }

  constructor() {
    this.texts = [];
  }

  add(options?: StyledTextOptions, paragraph?: boolean) {
    const txt = new StyledText(paragraph);
    txt.add(options);
    this.texts.push(txt);
    return txt;
  }
}
