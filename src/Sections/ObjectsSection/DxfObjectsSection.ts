import DxfDictionary from './Objects/DxfDictionary';
import DxfObject from './DxfObject';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import DxfImageDef from './Objects/DxfImageDef';
import DxfImageDefReactor from './Objects/DxfImageDefReactor';
import { Dxifier } from '../../Internals/Dxifier';

export default class DxfObjectsSection implements DxfInterface {
	root: DxfDictionary = new DxfDictionary();

	readonly objects: DxfObject[] = [];

	constructor() {
		this.root.duplicateRecordCloningFlag = 1;
		const d = this.addDictionary();
		this.root.addEntryObject('ACAD_GROUP', d.handle);
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
		const d = new DxfDictionary();
		d.ownerObjecthandle = this.root.handle;
		this.addObject(d);
		return d;
	}

	addEntryToRoot(name: string, softOwner: string): void {
		this.root.addEntryObject(name, softOwner);
	}

	dxify(dx: Dxifier) {
		dx.start('OBJECTS');
		this.root.dxify(dx);
		for (const obj of this.objects) {
			obj.dxify(dx);
		}
		dx.end();
		dx.type('EOF');
	}
}
