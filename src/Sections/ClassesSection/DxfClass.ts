import type { Dxfier } from "Internals/Dxfier";
import type { DxfInterface } from "Internals/Interfaces";

/**
 * What a CLASS record says of a type AutoCAD does not know by itself.
 */
export type classDefinition_t = {
  /** The DXF type the record is for, IMAGE for example. */
  name: string;
  /** The C++ class behind it, AcDbRasterImage for example. */
  cppClassName: string;
  /** The application that defines it, ISM for example. */
  applicationName: string;
  /** What a program lacking the class may do with a proxy of it. */
  proxyFlags: number;
  /** True for an entity, false for an object. */
  isAnEntity: boolean;
};

/**
 * A CLASS record of the CLASSES section, with the count of the type's
 * instances in the drawing.
 */
export class DxfClass implements DxfInterface {
  readonly name: string;
  readonly cppClassName: string;
  readonly applicationName: string;
  readonly proxyFlags: number;
  readonly isAnEntity: boolean;
  instanceCount: number;
  wasAProxy: boolean;

  constructor(definition: classDefinition_t, instanceCount: number) {
    this.name = definition.name;
    this.cppClassName = definition.cppClassName;
    this.applicationName = definition.applicationName;
    this.proxyFlags = definition.proxyFlags;
    this.isAnEntity = definition.isAnEntity;
    this.instanceCount = instanceCount;
    this.wasAProxy = false;
  }

  dxfy(dx: Dxfier): void {
    dx.type("CLASS");
    dx.push(1, this.name);
    dx.push(2, this.cppClassName);
    dx.push(3, this.applicationName);
    dx.push(90, this.proxyFlags);
    dx.push(91, this.instanceCount);
    dx.push(280, Number(this.wasAProxy));
    dx.push(281, Number(this.isAnEntity));
  }
}
