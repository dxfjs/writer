import DxfDictionary from './Objects/DxfDictionary';
import DxfObject from './DxfObject';
import TagsManager, { tag_t } from '../../Internals/TagsManager';

export default class DxfObjects {
	private _rootDictionary: DxfDictionary = new DxfDictionary();
	private _acadDictionary: DxfDictionary;

	private _objects: DxfObject[] = [];

	public get rootDictionary(): DxfDictionary {
		return this._rootDictionary;
	}

	public get acadDictionary(): DxfDictionary {
		return this._acadDictionary;
	}

	public get objects(): DxfObject[] {
		return this._objects;
	}

	public constructor() {
		this._acadDictionary = this.createDictionary();
		this.rootDictionary.duplicateRecordCloningFlag = 1;
		this.acadDictionary.duplicateRecordCloningFlag = 1;

		this.rootDictionary.addEntryObject(
			'ACAD_GROUP',
			this.acadDictionary.handle
		);
	}

	public addObject(object: DxfObject): void {
		this._objects.push(object);
	}

	public createDictionary(): DxfDictionary {
		const dictionary = new DxfDictionary();
		dictionary.softPointer = this.rootDictionary.handle;
		this.addObject(dictionary);
		return dictionary;
	}

	public addEntryToRootDictionary(name: string, softOwner: string): void {
		this.rootDictionary.addEntryObject(name, softOwner);
	}

	public tags(): tag_t[] {
		const manager = new TagsManager();
		manager.sectionBegin('OBJECTS');
		manager.pushTags(this.rootDictionary.tags());
		this.objects.forEach((object) => {
			manager.pushTags(object.tags());
		});
		manager.sectionEnd();
		return manager.tags;
	}

	public stringify(): string {
		const manager = new TagsManager();
		manager.pushTags(this.tags());
		return manager.stringify();
	}
}
