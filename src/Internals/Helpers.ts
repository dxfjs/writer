import { LWPolylineOptions } from '..';

export function bulge(fillet: number): number {
	const length = Math.sqrt(Math.pow(fillet, 2) + Math.pow(fillet, 2));
	const b = length / 2;
	const d = Math.sqrt(Math.pow(fillet, 2) - Math.pow(b, 2));
	const height = fillet - d;
	return -height / b;
}

export type chamfer_t = {
	first: number;
	second?: number;
};

export type rectangleOptions_t = LWPolylineOptions & {
	chamfer?: chamfer_t;
	fillet?: number;
};

export type rgb_t = {
	r: number;
	g: number;
	b: number;
};

export type vec3_t = {
	x: number;
	y: number;
	z: number;
};

export type vec2_t = {
	x: number;
	y: number;
};

/**
 * @param x The X coordinate of the point.
 * @param y The Y coordinate of the point.
 * @param z The Z coordinate of the point. By default 0.
 * @returns The vec3_t point.
 */
export function point3d(x: number, y: number, z?: number): vec3_t {
	return { x, y, z: z ?? 0 };
}

/**
 * @param x The X coordinate of the point.
 * @param y The Y coordinate of the point.
 * @returns The vec2_t point.
 */
export function point2d(x: number, y: number): vec2_t {
	return { x, y };
}

export function rad2deg(v: number) {
	return (v * 180) / Math.PI;
}

export function deg2rad(v: number) {
	return (v * Math.PI) / 180;
}
