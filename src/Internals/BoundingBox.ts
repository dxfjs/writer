import { point3d, vec3_t } from './Helpers';

export type boundingBox_t = {
	tl: vec3_t; // Top-left
	br: vec3_t; // Bottom-Right
};

export const createBoundingBox = (tl: vec3_t, br: vec3_t): boundingBox_t => {
	return {
		tl: tl,
		br: br,
	};
};

export class BoundingBox {
	static centerRadiusBBox(center: vec3_t, radius: number) {
		return createBoundingBox(
			point3d(center.x - radius, center.y + radius, 0),
			point3d(center.x + radius, center.y - radius, 0)
		);
	}

	static pointBBox(point: vec3_t) {
		return createBoundingBox(point3d(point.x - 100, point.y + 100, 0), point3d(point.x + 100, point.y - 100, 0));
	}

	/**
	 * @param sp The start point.
	 * @param ep The end point.
	 * @returns
	 */
	static lineBBox(sp: vec3_t, ep: vec3_t) {
		const maxX = sp.x > ep.x ? sp.x : ep.x;
		const minX = sp.x < ep.x ? sp.x : ep.x;
		const maxY = sp.y > ep.y ? sp.y : ep.y;
		const minY = sp.y < ep.y ? sp.y : ep.y;
		return createBoundingBox(point3d(minX, maxY, 0), point3d(maxX, minY, 0));
	}

	static verticesBBox(vertices: vec3_t[]) {
		let _xMax = -Infinity;
		let _yMax = -Infinity;
		let _xMin = Infinity;
		let _yMin = Infinity;
		for (let i = 0; i < vertices.length; i++) {
			const { x, y } = vertices[i];
			if (_xMax < x) _xMax = x;
			if (_yMax < y) _yMax = y;
			if (_xMin > x) _xMin = x;
			if (_yMin > y) _yMin = y;
		}
		return createBoundingBox(point3d(_xMin, _yMax, 0), point3d(_xMax, _yMin, 0));
	}

	static boundingBox(boundingBoxes: boundingBox_t[]): boundingBox_t {
		if (boundingBoxes.length === 0) return BoundingBox.pointBBox(point3d(0, 0, 0));
		const _vertices = [];
		for (let i = 0; i < boundingBoxes.length; i++) {
			const _bbox = boundingBoxes[i];
			_vertices.push(_bbox.tl, _bbox.br);
		}
		return BoundingBox.verticesBBox(_vertices);
	}

	static boundingBoxCenter(boundingBox: boundingBox_t): vec3_t {
		const x = boundingBox.tl.x + (boundingBox.br.x - boundingBox.tl.x) / 2;
		const y = boundingBox.br.y + (boundingBox.tl.y - boundingBox.br.y) / 2;
		return point3d(x, y, 0);
	}

	static boundingBoxHeight(boundingBox: boundingBox_t) {
		return boundingBox.tl.y - boundingBox.br.y;
	}
}
