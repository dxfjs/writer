export function periodic(value: number, rmin: number, rmax: number) {
  const range = rmax - rmin;
  while (value > rmax) value -= range;
  while (value < rmin) value += range;
  return value;
}
