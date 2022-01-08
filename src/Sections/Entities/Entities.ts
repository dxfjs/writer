import Entity from './Entity';

import TagsManager, { point3d_t } from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import BoundingBox, { boundingBox_t } from '../../Internals/BoundingBox';

export default class Entities implements DxfInterface {
	private _entities: Entity[] = [];

	public constructor() {}

	public boundingBox(): boundingBox_t {
		return BoundingBox.boundingBox(
			this.entities.map((enity) => enity.boundingBox())
		);
	}

	public centerView(): point3d_t {
		return BoundingBox.boundingBoxCenter(this.boundingBox());
	}

	public viewHeight(): number {
		return BoundingBox.boundingBoxHeight(this.boundingBox());
	}

	public get entities(): Entity[] {
		return this._entities;
	}

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionBegin('ENTITIES');
		this.entities.forEach((entity) => {
			manager.appendTags(entity);
		});
		manager.sectionEnd();
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
