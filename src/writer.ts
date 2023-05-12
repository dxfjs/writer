import { Stringifiable } from "./types";
import { XDocument } from "./document";

export class XWriter implements Stringifiable {
  readonly document: XDocument;

  public constructor() {
    this.document = new XDocument();
  }

  stringify(): string {
    throw new Error("Method not implemented.");
  }
}