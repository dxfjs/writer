import { point3d, point3d_t } from './Utils';

export function min(numbers: number[]) {
	let _min = Infinity;
	for (let i = 0; i < numbers.length; i++) {
		const n = numbers[i];
		if (n < _min) _min = n;
	}
	return _min;
}

export function max(numbers: number[]) {
	let _max = -Infinity;
	for (let i = 0; i < numbers.length; i++) {
		const n = numbers[i];
		if (n > _max) _max = n;
	}
	return _max;
}

export type boundingBox_t = {
	topLeft: point3d_t;
	bottomRight: point3d_t;
};

export const createBoundingBox = (
	topLeft: point3d_t,
	bottomRight: point3d_t
): boundingBox_t => {
	return {
		topLeft,
		bottomRight,
	};
};

export default class BoundingBox {
	static centerRadiusBBox(center: point3d_t, radius: number) {
		return createBoundingBox(
			point3d(center.x - radius, center.y + radius, 0),
			point3d(center.x + radius, center.y - radius, 0)
		);
	}

	static pointBBox(point: point3d_t) {
		return createBoundingBox(
			point3d(point.x - 100, point.y + 100, 0),
			point3d(point.x + 100, point.y - 100, 0)
		);
	}

	static lineBBox(startPoint: point3d_t, endPoint: point3d_t) {
		const maxX = max([startPoint.x, endPoint.x]);
		const minX = min([startPoint.x, endPoint.x]);
		const maxY = max([startPoint.y, endPoint.y]);
		const minY = min([startPoint.y, endPoint.y]);
		return createBoundingBox(
			point3d(minX, maxY, 0),
			point3d(maxX, minY, 0)
		);
	}

	static verticesBBox(vertices: point3d_t[]) {
		const _xCoordinates = [];
		const _yCoordinates = [];
		for (let i = 0; i < vertices.length; i++) {
			const _vertex = vertices[i];
			_xCoordinates.push(_vertex.x);
			_yCoordinates.push(_vertex.y);
		}
		const maxX = max(_xCoordinates);
		const minX = min(_xCoordinates);
		const maxY = max(_yCoordinates);
		const minY = min(_yCoordinates);
		return createBoundingBox(
			point3d(minX, maxY, 0),
			point3d(maxX, minY, 0)
		);
	}

	static boundingBox(boundingBoxes: boundingBox_t[]): boundingBox_t {
		if (boundingBoxes.length === 0)
			return BoundingBox.pointBBox(point3d(0, 0, 0));
		const _vertices = [];
		for (let i = 0; i < boundingBoxes.length; i++) {
			const _bbox = boundingBoxes[i];
			_vertices.push(_bbox.topLeft, _bbox.bottomRight);
		}
		return BoundingBox.verticesBBox(_vertices);
	}

	static boundingBoxCenter(boundingBox: boundingBox_t): point3d_t {
		const x =
			boundingBox.topLeft.x +
			(boundingBox.bottomRight.x - boundingBox.topLeft.x) / 2;
		const y =
			boundingBox.bottomRight.y +
			(boundingBox.topLeft.y - boundingBox.bottomRight.y) / 2;
		return point3d(x, y, 0);
	}

	static boundingBoxHeight(boundingBox: boundingBox_t) {
		return boundingBox.topLeft.y - boundingBox.bottomRight.y;
	}
}
