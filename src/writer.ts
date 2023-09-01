import { Stringifiable } from "./types";
import { Document } from "./document";

export class Writer implements Stringifiable {
  readonly document: Document;

  public constructor() {
    this.document = new Document();
  }

  stringify(): string {
    return this.document.stringify();
  }
}
