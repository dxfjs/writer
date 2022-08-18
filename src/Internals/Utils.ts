import { point3d, vec3_t } from './Helpers';

export function d(f: vec3_t, s: vec3_t) {
	return Math.sqrt(Math.pow(f.x - s.x, 2) + Math.pow(f.y - s.y, 2));
}

export function rad2deg(v: number) {
	return (v * 180) / Math.PI;
}

export function angle(f: vec3_t, s: vec3_t) {
	const _d = d(f, s);
	if (_d === 0) return _d;
	return rad2deg(Math.asin(Math.abs(f.y - s.y) / _d));
}

export function b(d: number, ab: [a: number, b: number]) {
	const [a, b] = ab;
	return b - d * Math.sqrt(a * a + 1);
}

export function ab(f: vec3_t, s: vec3_t): [a: number, b: number] {
	const deltaX = f.x - s.x;
	let a = 0;
	if (deltaX !== 0) a = (f.y - s.y) / deltaX;
	const b = f.y - a * f.x;
	return [a, b];
}

export function xy(ab: [a: number, b: number], p: vec3_t): vec3_t {
	const [a, b] = ab;
	const a2 = a ?? -1 / a;
	const b2 = p.y - a2 * p.x;
	const deltaA = a2 - a;
	let x = b - b2;
	if (deltaA !== 0) x = (b - b2) / deltaA;
	const y = a * x + b;
	return point3d(x, y, p.z);
}
