import { Dxifier } from '../../../../Internals/Dxifier';
import { point3d, vec3_t } from '../../../../Internals/Helpers';
import { deg2rad } from '../../../../Internals/Utils';
import { Dimension, DimensionOptions, DimensionType } from './Dimension';

export interface LinearDimOptions extends DimensionOptions {
	insertionPoint?: vec3_t;
	offset?: number;
	angle?: number;
	linearType?: number;
}

export class LinearDimension extends Dimension {
	insertionPoint?: vec3_t;
	fisrtPoint: vec3_t;
	secondPoint: vec3_t;
	angle: number;
	linearType?: number;
	constructor(first: vec3_t, second: vec3_t, options?: LinearDimOptions) {
		super(options);
		this.dimensionType = DimensionType.Default;
		this.insertionPoint = options?.insertionPoint;
		this.fisrtPoint = first;
		this.secondPoint = second;
		this.angle = options?.angle ?? 0;
		this.linearType = options?.linearType;
		this.offset(options?.offset);
	}

	private offset(v?: number) {
		if (v == null) return;
		const radAngle = deg2rad(this.angle);
		const x = this.fisrtPoint.x + v * Math.floor(Math.sin(radAngle));
		const y = this.fisrtPoint.y + v * Math.floor(Math.cos(radAngle));
		this.definitionPoint = point3d(x, y, 0);
	}

	protected override rotate(): number {
		return this.angle;
	}

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.subclassMarker('AcDbAlignedDimension');
		dx.push(12, this.insertionPoint?.x);
		dx.push(22, this.insertionPoint?.y);
		dx.push(32, this.insertionPoint?.z);
		dx.push(13, this.fisrtPoint.x);
		dx.push(23, this.fisrtPoint.y);
		dx.push(33, this.fisrtPoint.z);
		dx.push(14, this.secondPoint.x);
		dx.push(24, this.secondPoint.y);
		dx.push(34, this.secondPoint.z);
		dx.push(50, this.angle);
		dx.push(52, this.linearType);
		dx.subclassMarker('AcDbRotatedDimension');
	}
}
