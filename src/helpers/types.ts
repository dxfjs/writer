import { Block, Entity } from "@/index";

export interface Writable<E extends Entity = Entity> {
  write<B extends Block>(block: B): E;
}
