import { Document } from "./document";
import { Stringifiable } from "./types";

export class Writer implements Stringifiable {
  readonly document: Document;

  public constructor() {
    this.document = new Document();
  }

  stringify(): string {
    return this.document.stringify();
  }
}
