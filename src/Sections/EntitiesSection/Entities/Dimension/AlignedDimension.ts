import { Dxfier } from 'Internals/Dxfier';
import { vec3_t } from 'Internals/Helpers';
import { ab, angle, b, xy } from 'Internals/Utils';
import { Dimension, DimensionOptions, DimensionType } from './Dimension';

export interface AlignedDimOptions extends DimensionOptions {
	insertionPoint?: vec3_t;
	offset?: number;
}

export class AlignedDimension extends Dimension {
	insertionPoint?: vec3_t;
	fisrtPoint: vec3_t;
	secondPoint: vec3_t;
	constructor(first: vec3_t, second: vec3_t, options?: AlignedDimOptions) {
		super(options);
		this.dimensionType = DimensionType.Aligned;
		this.insertionPoint = options?.insertionPoint;
		this.fisrtPoint = first;
		this.secondPoint = second;
		this.offset(options?.offset);
	}

	private offset(v?: number) {
		if (v == null) return;
		const [a_, b_] = ab(this.fisrtPoint, this.secondPoint);
		const _b = b(v, [a_, b_]);
		this.definitionPoint = xy([a_, _b], this.fisrtPoint);
	}

	protected override rotate(): number {
		return angle(this.fisrtPoint, this.secondPoint);
	}

	override dxfy(dx: Dxfier): void {
		super.dxfy(dx);
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
	}
}
