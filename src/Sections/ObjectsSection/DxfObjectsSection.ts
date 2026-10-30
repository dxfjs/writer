import type { Dxfier } from "Internals/Dxfier";
import type { DxfInterface } from "Internals/Interfaces";
import type { DxfObject } from "./DxfObject";
import { DxfDictionary } from "./Objects/DxfDictionary";
import { DxfImageDef } from "./Objects/DxfImageDef";
import { DxfImageDefReactor } from "./Objects/DxfImageDefReactor";
import { DxfRasterVariables } from "./Objects/DxfRasterVariables";

export class DxfObjectsSection implements DxfInterface {
  readonly root: DxfDictionary = new DxfDictionary();

  readonly objects: DxfObject[] = [];

  #imageDictionary?: DxfDictionary;
  readonly #imageDefs = new Map<string, DxfImageDef>();

  constructor() {
    this.root.duplicateRecordCloningFlag = 1;
    const d = this.addDictionary();
    this.root.addEntryObject("ACAD_GROUP", d.handle);
  }

  /** The ACAD_IMAGE_DICT dictionary, once an image definition exists. */
  get imageDictionary(): DxfDictionary | undefined {
    return this.#imageDictionary;
  }

  public addObject<T extends DxfObject>(object: T): T {
    this.objects.push(object);
    return object;
  }

  /**
   * The IMAGEDEF filed under `name` in ACAD_IMAGE_DICT, made from the
   * picture at `path`, `width` by `height` pixels, when there is none
   * yet. Images of one name share it, as AutoCAD shares one definition
   * between every reference to a file.
   */
  addImageDef(
    path: string,
    name: string,
    width: number,
    height: number,
  ): DxfImageDef {
    const existing = this.#imageDefs.get(name);
    if (existing) return existing;
    const dictionary = this.#imageDictionary ?? this.addImageDictionary();
    const imageDef = this.addObject(new DxfImageDef(path, width, height));
    imageDef.ownerObjecthandle = dictionary.handle;
    imageDef.reactors.push(dictionary.handle);
    dictionary.addEntryObject(name, imageDef.handle);
    this.#imageDefs.set(name, imageDef);
    return imageDef;
  }

  /** The IMAGEDEF_REACTOR of the IMAGE `imageHandle`, which owns it. */
  addImageDefReactor(imageHandle: string): DxfImageDefReactor {
    return this.addObject(new DxfImageDefReactor(imageHandle));
  }

  addDictionary(): DxfDictionary {
    const d = new DxfDictionary();
    d.ownerObjecthandle = this.root.handle;
    this.addObject(d);
    return d;
  }

  addEntryToRoot(name: string, softOwner: string): void {
    this.root.addEntryObject(name, softOwner);
  }

  // ACAD_IMAGE_DICT and ACAD_IMAGE_VARS arrive together with the first
  // image, as AutoCAD makes them
  private addImageDictionary(): DxfDictionary {
    const dictionary = this.addDictionary();
    dictionary.duplicateRecordCloningFlag = 1;
    dictionary.reactors.push(this.root.handle);
    this.root.addEntryObject("ACAD_IMAGE_DICT", dictionary.handle);
    const variables = this.addObject(new DxfRasterVariables());
    variables.ownerObjecthandle = this.root.handle;
    variables.reactors.push(this.root.handle);
    this.root.addEntryObject("ACAD_IMAGE_VARS", variables.handle);
    this.#imageDictionary = dictionary;
    return dictionary;
  }

  dxfy(dx: Dxfier) {
    dx.start("OBJECTS");
    this.root.dxfy(dx);
    for (const obj of this.objects) {
      obj.dxfy(dx);
    }
    dx.end();
    dx.type("EOF");
  }
}
