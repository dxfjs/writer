import TagsManager from '../TagsManager';

export default interface DxfInterface {
	stringify(): string;
	get manager(): TagsManager;
}
