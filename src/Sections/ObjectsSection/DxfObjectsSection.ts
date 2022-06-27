import DxfDictionary from './Objects/DxfDictionary';
import DxfObject from './DxfObject';
import TagsManager from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import DxfImageDef from './Objects/DxfImageDef';
import DxfImageDefReactor from './Objects/DxfImageDefReactor';

export default class DxfObjectsSection implements DxfInterface {
	root: DxfDictionary = new DxfDictionary();

	readonly objects: DxfObject[] = [];

	constructor() {
		this.root.duplicateRecordCloningFlag = 1;
		const dic = this.addDictionary();

		this.root.addEntryObject('ACAD_GROUP', dic.handle);
	}

	public addObject<T extends DxfObject>(object: T): T {
		this.objects.push(object);
		return object;
	}

	addImageDef(path: string) {
		return this.addObject(new DxfImageDef(path));
	}

	addImageDefReactor(imageHandle: string) {
		return this.addObject(new DxfImageDefReactor(imageHandle));
	}

	addDictionary(): DxfDictionary {
		const dictionary = new DxfDictionary();
		dictionary.ownerObjecthandle = this.root.handle;
		this.addObject(dictionary);
		return dictionary;
	}

	addEntryToRoot(name: string, softOwner: string): void {
		this.root.addEntryObject(name, softOwner);
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionStart('OBJECTS');
		manager.append(this.root);
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
