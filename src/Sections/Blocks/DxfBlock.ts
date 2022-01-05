import Handle from '../../Internals/Handle';
import TagsManager, { point3d_t, tag_t } from '../../Internals/TagsManager';
import Entity from '../Entities/Entity';
import EndBlk from './DxfEndBlk';

export default class DxfBlock extends Handle {
	private readonly _entities: Entity[] = [];
	private readonly _name: string;
	private readonly _endBlk: EndBlk;

	private _blockTypeFlags: number = 0;
	private _basePoint: point3d_t = {
		x: 0,
		y: 0,
		z: 0,
	};
	private _xrefPathName: string = '';

	public get entities(): Entity[] {
		return this._entities;
	}

	public get name(): string {
		return this._name;
	}

	public get endBlk(): EndBlk {
		return this._endBlk;
	}

	public get blockTypeFlags(): number {
		return this._blockTypeFlags;
	}

	public set blockTypeFlags(value: number) {
		this._blockTypeFlags = value;
	}

	public get basePoint(): point3d_t {
		return this._basePoint;
	}

	public set basePoint(value: point3d_t) {
		this._basePoint = value;
	}

	public get xrefPathName(): string {
		return this._xrefPathName;
	}

	public set xrefPathName(value: string) {
		this._xrefPathName = value;
	}

	public constructor(name: string) {
		super();
		this._name = name;
		this._endBlk = new EndBlk();
	}

	public addEntity(entity: Entity) {
		this._entities.push(entity);
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		manager.entityType('BLOCK');
		manager.handle(this.handle);
		manager.pushTag(this.softPointerTag());
		manager.subclassMarker('AcDbEntity');
		manager.layerName('0'); // TODO make this dynamic
		manager.subclassMarker('AcDbBlockBegin');
		manager.name(this.name);
		manager.addTag(70, this.blockTypeFlags);
		manager.point3d(this.basePoint);
		manager.name(this.name, 3);
		manager.addTag(1, this.xrefPathName);
		manager.pushTags(
			this.entities.reduce((tags: tag_t[], entity) => {
				return [...tags, ...entity.tags()];
			}, [])
		);

		manager.appendTags(this._endBlk);
		return manager.tags;
	}
}
