import { lwPolylineOptions_t } from '../Sections/Entities/Entities/LWPolyline';

export type Merge<T, U> = {
	[k in keyof T | keyof U]+?: k extends keyof T
		? T[k]
		: k extends keyof U
		? U[k]
		: never;
};

export function defined<T>(value: T): boolean {
	return value !== undefined;
}

export function bulge(fillet: number): number {
	const length = Math.sqrt(Math.pow(fillet, 2) + Math.pow(fillet, 2));
	const b = length / 2;
	const d = Math.sqrt(Math.pow(fillet, 2) - Math.pow(b, 2));
	const height = fillet - d;
	const bulge = -height / b;
	return bulge;
}

export type chamfer_t = {
	first: number;
	second?: number;
};

export type rectangleOptions_t = Merge<
	lwPolylineOptions_t,
	{
		chamfer?: chamfer_t;
		fillet?: number;
		elevation?: number;
	}
>;
