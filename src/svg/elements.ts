import { Arc, Line, MText, Solid } from "@/entities";
import { ArcPrimitive } from "@/helpers";
import { LayerEntry } from "@/tables";
import { colors } from "./colors";

export function lineSvg(line: Line, layer?: LayerEntry) {
  const { start, end } = line;
  const parts: string[] = [];
  const color: string = colors[layer?.colorNumber ?? 0];
  parts.push("<line");
  parts.push(`x1="${start.x}"`);
  parts.push(`y1="${start.y}"`);
  parts.push(`x2="${end.x}"`);
  parts.push(`y2="${end.y}"`);
  parts.push(`stroke="${color}"`);
  parts.push("stroke-width=\"1\"");
  parts.push("vector-effect=\"non-scaling-stroke\"");
  parts.push("/>");
  return parts.join(" ");
}

export function solidSvg(s: Solid, layer?: LayerEntry) {
  const { first, second, third, fourth } = s;
  const parts: string[] = [];
  const color: string = colors[layer?.colorNumber ?? 0];
  parts.push("<path");
  const d = [
    "M",
    first.x,
    first.y,
    "L",
    second.x,
    second.y,
    "L",
    third.x,
    third.y,
    "L",
    fourth.x,
    fourth.y,
    "Z",
  ].join(" ");
  parts.push(`d="${d}"`);
  parts.push(`fill="${color}"`);
  parts.push("/>");
  return parts.join(" ");
}

export function textSvg(t: MText, layer?: LayerEntry) {
  const { insertionPoint: i } = t;
  const parts: string[] = [];
  const color: string = colors[layer?.colorNumber ?? 0];
  parts.push("<text");
  parts.push(`x="${i.x}"`);
  parts.push(`y="${-i.y}"`);
  parts.push(`font-size="${t.height}px"`);
  parts.push(
    `transform="rotate(${t.rotation ?? 0},${i.x},${i.y}) scale(1, -1)"`
  );
  parts.push(`fill="${color}"`);
  parts.push("text-anchor=\"middle\"");
  parts.push(`>${t.value}</text>`);
  return parts.join(" ");
}

export function arcSvg(a: Arc, layer?: LayerEntry) {
  const parts: string[] = [];
  const color: string = colors[layer?.colorNumber ?? 0];
  parts.push("<path");
  const { start, end, radius, angle } = new ArcPrimitive(a);
  const flag = angle <= 180 ? "0" : "1";
  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    flag,
    "1",
    end.x,
    end.y,
  ].join(" ");
  parts.push(`d="${d}"`);
  parts.push("fill=\"transparent\"");
  parts.push(`stroke="${color}"`);
  parts.push("stroke-width=\"1\"");
  parts.push("vector-effect=\"non-scaling-stroke\"");
  parts.push("/>");
  return parts.join(" ");
}
