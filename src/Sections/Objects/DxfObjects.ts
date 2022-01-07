import DxfDictionary from './Objects/DxfDictionary';
import DxfObject from './DxfObject';
import TagsManager from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';

export default class DxfObjects implements DxfInterface {
	private _rootDictionary: DxfDictionary = new DxfDictionary();

	private _objects: DxfObject[] = [];

	public get rootDictionary(): DxfDictionary {
		return this._rootDictionary;
	}

	public get objects(): DxfObject[] {
		return this._objects;
	}

	public constructor() {
		this.rootDictionary.duplicateRecordCloningFlag = 1;
		const dic = this.createDictionary();

		this.rootDictionary.addEntryObject('ACAD_GROUP', dic.handle);
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

	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionBegin('OBJECTS');
		manager.appendTags(this.rootDictionary);
		this.objects.forEach((object) => {
			manager.appendTags(object);
		});
		manager.sectionEnd();
		manager.entityType('EOF');
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
