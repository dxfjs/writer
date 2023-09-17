import { Block } from "@/blocks";
import { Entity } from "@/entities";

export interface Writable<E extends Entity = Entity> {
  write<B extends Block>(block: B): E;
}
