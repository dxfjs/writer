import { vec3_t } from 'Internals/Helpers';
import { Dxifier } from 'Internals/Dxifier';
import { Dimension, DimensionOptions, DimensionType } from './Dimension';

export interface DLine {
	start: vec3_t;
	end: vec3_t;
}

export class AngularDimLines extends Dimension {
	constructor(public first: DLine, public second: DLine, public location: vec3_t, options?: DimensionOptions) {
		super(options);
		this.dimensionType = DimensionType.Angular;
	}

	private _update() {
		this.definitionPoint = this.second.end;
	}

	override dxify(dx: Dxifier): void {
		this._update();
		super.dxify(dx);
		dx.subclassMarker('AcDb2LineAngularDimension');
		dx.push(13, this.first.start.x);
		dx.push(23, this.first.start.y);
		dx.push(33, this.first.start.z);
		dx.push(14, this.first.end.x);
		dx.push(24, this.first.end.y);
		dx.push(34, this.first.end.z);
		dx.push(15, this.second.start.x);
		dx.push(25, this.second.start.y);
		dx.push(35, this.second.start.z);
		dx.push(16, this.location.x);
		dx.push(26, this.location.y);
		dx.push(36, this.location.z);
	}
}
