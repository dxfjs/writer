import { point3d, point3d_t } from './TagsManager';

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
	public constructor() {}

	public static centerRadiusBBox(center: point3d_t, radius: number) {
		return createBoundingBox(
			point3d(center.x - radius, center.y + radius, 0),
			point3d(center.x + radius, center.y - radius, 0)
		);
	}

	public static pointBBox(point: point3d_t) {
		return createBoundingBox(
			point3d(point.x - 100, point.y + 100, 0),
			point3d(point.x + 100, point.y - 100, 0)
		);
	}

	public static lineBBox(startPoint: point3d_t, endPoint: point3d_t) {
		const maxX = Math.max(startPoint.x, endPoint.x);
		const minX = Math.min(startPoint.x, endPoint.x);
		const maxY = Math.max(startPoint.y, endPoint.y);
		const minY = Math.min(startPoint.y, endPoint.y);
		return createBoundingBox(
			point3d(minX, maxY, 0),
			point3d(maxX, minY, 0)
		);
	}

	public static verticesBBox(vertices: point3d_t[]) {
		const xCoordinates = vertices.map((vertex) => vertex.x);
		const yCoordinates = vertices.map((vertex) => vertex.y);
		const maxX = Math.max(...xCoordinates);
		const minX = Math.min(...xCoordinates);
		const maxY = Math.max(...yCoordinates);
		const minY = Math.min(...yCoordinates);
		return createBoundingBox(
			point3d(minX, maxY, 0),
			point3d(maxX, minY, 0)
		);
	}

	public static boundingBox(boundingBoxes: boundingBox_t[]): boundingBox_t {
		if (boundingBoxes.length === 0)
			return BoundingBox.pointBBox(point3d(0, 0, 0));
		return BoundingBox.verticesBBox(
			boundingBoxes.reduce((vertices: point3d_t[], bBox) => {
				return [...vertices, bBox.topLeft, bBox.bottomRight];
			}, [])
		);
	}

	public static boundingBoxCenter(boundingBox: boundingBox_t): point3d_t {
		const x =
			boundingBox.topLeft.x +
			(boundingBox.bottomRight.x - boundingBox.topLeft.x) / 2;
		const y =
			boundingBox.bottomRight.y +
			(boundingBox.topLeft.y - boundingBox.bottomRight.y) / 2;
		return point3d(x, y, 0);
	}

	public static boundingBoxHeight(boundingBox: boundingBox_t) {
		return boundingBox.topLeft.y - boundingBox.bottomRight.y;
	}
}
