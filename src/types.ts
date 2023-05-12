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
