import { BlockRecordEntry, Seeder } from ".";

export interface Tag {
  code: number;
  value: string | number;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D extends Point2D {
  z: number;
}

export interface Stringifiable {
  stringify(): string;
}

export interface Taggable<IManager = unknown> {
  tagify(mg: IManager): void;
}

export type Union<T> = T[keyof T];

export type WithSeeder<T = object> = T & { seeder: Seeder };
export type WithBlockRecord<T = object> = T & { blockRecord: BlockRecordEntry };

export type OmitSeeder<T> = Omit<T, "seeder">;
export type OmitType<T> = Omit<T, "type">;
export type OmitBlockRecord<T> = Omit<T, "blockRecord">;
export type OmitBlockName<T> = Omit<T, "blockName">;
