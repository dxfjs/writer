import Entity, { options_t } from '../Entity';
import TagsManager, { point3d_t } from '../../../Internals/TagsManager';
import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';

/**
 * @public
 */
export enum InvisibleEdgeFlags {
	None = 0,
	First = 1,
	Second = 2,
	Third = 4,
	Fourth = 8,
}

/**
 * @public
 */
export type faceOptions_t = options_t & {
	invisibleEdges?: InvisibleEdgeFlags;
};

export default class Face extends Entity {
	firstCorner: point3d_t;
	secondCorner: point3d_t;
	thirdCorner: point3d_t;
	fourthCorner: point3d_t;
	invisibleEdges: InvisibleEdgeFlags;

	constructor(
		firstCorner: point3d_t,
		secondCorner: point3d_t,
		thirdCorner: point3d_t,
		fourthCorner: point3d_t,
		options?: faceOptions_t
	) {
		super('3DFACE', 'AcDbFace', options);
		this.firstCorner = firstCorner;
		this.secondCorner = secondCorner;
		this.thirdCorner = thirdCorner;
		this.fourthCorner = fourthCorner;
		this.invisibleEdges =
			options?.invisibleEdges || InvisibleEdgeFlags.None;
	}

	setFirstEdgeVisible(visible: boolean): void {
		this.setEdgeVisible(InvisibleEdgeFlags.First, visible);
	}

	setSecondEdgeVisible(visible: boolean): void {
		this.setEdgeVisible(InvisibleEdgeFlags.Second, visible);
	}

	setThirdEdgeVisible(visible: boolean): void {
		this.setEdgeVisible(InvisibleEdgeFlags.Third, visible);
	}

	setFourthEdgeVisible(visible: boolean): void {
		this.setEdgeVisible(InvisibleEdgeFlags.Fourth, visible);
	}

	setEdgesVisible(visible: boolean) {
		if (visible) this.invisibleEdges = InvisibleEdgeFlags.None;
		else {
			this.invisibleEdges =
				InvisibleEdgeFlags.First |
				InvisibleEdgeFlags.Second |
				InvisibleEdgeFlags.Third |
				InvisibleEdgeFlags.Fourth;
		}
	}

	private setEdgeVisible(flag: InvisibleEdgeFlags, visible: boolean): void {
		if (visible) {
			this.invisibleEdges |= flag;
		} else {
			if (this.invisibleEdges === (this.invisibleEdges | flag))
				this.invisibleEdges ^= flag;
		}
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.verticesBBox([
			this.firstCorner,
			this.secondCorner,
			this.thirdCorner,
			this.fourthCorner,
		]);
	}

	override get manager(): TagsManager {
		const manager = new TagsManager();
		manager.push(super.manager.tags);
		manager.point3d(this.firstCorner);
		manager.point3d(this.secondCorner, 1);
		manager.point3d(this.thirdCorner, 2);
		manager.point3d(this.fourthCorner, 3);
		manager.add(70, this.invisibleEdges);
		return manager;
	}
}
