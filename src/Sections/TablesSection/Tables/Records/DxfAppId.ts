import { Dxifier } from '../../../../Internals/Dxifier';
import DxfRecord from './DxfRecord';

export enum AppIdFlags {
	None = 0,
	XRefDependent = 16,
	XRefResolved = 32,
}

export default class DxfAppId extends DxfRecord {
	name: string;
	flags: AppIdFlags;

	public constructor(name: string, flags?: AppIdFlags) {
		super('APPID');
		this.name = name;
		this.flags = flags ?? AppIdFlags.None;
	}

	dxify(mg: Dxifier) {
		super.dxify(mg);
		mg.subclassMarker('AcDbRegAppTableRecord');
		mg.name(this.name);
		mg.push(70, this.flags);
	}
}
