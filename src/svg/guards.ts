import { Arc, Dimension, Entity, Line, MText, Solid } from "@/entities";

export function isLine(entity: Entity): entity is Line {
  return entity instanceof Line;
}

export function isSolid(entity: Entity): entity is Solid {
  return entity instanceof Solid;
}

export function isMText(entity: Entity): entity is MText {
  return entity instanceof MText;
}

export function isArc(entity: Entity): entity is Arc {
  return entity instanceof Arc;
}

export function isDimension(entity: Entity): entity is Dimension {
  return entity instanceof Dimension;
}
