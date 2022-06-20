import DxfDictionary from './Objects/DxfDictionary';
import DxfObject from './DxfObject';
import TagsManager from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';

export default class DxfObjects implements DxfInterface {
	rootDictionary: DxfDictionary = new DxfDictionary();

	objects: DxfObject[] = [];

	constructor() {
		this.rootDictionary.duplicateRecordCloningFlag = 1;
		const dic = this.addDictionary();

		this.rootDictionary.addEntryObject('ACAD_GROUP', dic.handle);
	}


	public addObject<T extends DxfObject>(object: T): T {
		this.objects.push(object);
		return object;
	}

	addDictionary(): DxfDictionary {
		const dictionary = new DxfDictionary();
		dictionary.ownerObjecthandle = this.rootDictionary.handle;
		this.addObject(dictionary);
		return dictionary;
	}

	addEntryToRootDictionary(name: string, softOwner: string): void {
		this.rootDictionary.addEntryObject(name, softOwner);
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionStart('OBJECTS');
		manager.append(this.rootDictionary);
		this.objects.forEach((object) => {
			manager.append(object);
		});
		manager.sectionEnd();
		manager.entityType('EOF');
		return manager;
	}

	stringify(): string {
		return this.manager.stringify();
	}
}
