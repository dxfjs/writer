import TagsManager from './TagsManager';

export const definedAppGroup =
	(name: string) =>
	(groupCode: number) =>
	(value: number | string): TagsManager => {
		const manager = new TagsManager();
		manager.addTag(102, `{${name}`);
		manager.addTag(groupCode, value);
		manager.addTag(102, '}');
		return manager;
	};

export const ReactorsSoftPointer = definedAppGroup('ACAD_REACTORS')(330);
export const XdictionaryHardOwner = definedAppGroup('ACAD_XDICTIONARY')(360);
