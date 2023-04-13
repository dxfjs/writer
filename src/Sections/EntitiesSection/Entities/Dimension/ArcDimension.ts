
import { Dimension, DimensionOptions } from "./Dimension";

import { vec3_t } from 'Internals/Helpers'
import { Dxfier } from "Internals/Dxfier";

//ref https://ezdxf.mozman.at/docs/tutorials/arc_dimension.html#tut-arc-dimension
//ref https://github.com/mozman/ezdxf/blob/master/src/ezdxf/entities/dimension.py
export class ArcDimension extends Dimension {
    center: vec3_t;
    startPoint: vec3_t;
    endPoint: vec3_t;
    startAngle: number = 0;
    endAngle: number = 0;
    isPartial: 1 | 0 = 0;
    hasLeader: 1 | 0 = 0;
    leaderPoint1?: vec3_t;
    leaderPoint2?: vec3_t;

    constructor(center: vec3_t, startPoint: vec3_t, endPoint: vec3_t, options?: DimensionOptions) {
        super(options);
        this.type = "ARC_DIMENSION";
        this.center = center;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    protected rotate(): number {
        return 0;
    }

    override dxfy(dx: Dxfier) {
        super.dxfy(dx);
        dx.subclassMarker('AcDbArcDimension');

        dx.push(13, this.startPoint?.x);
        dx.push(23, this.startPoint?.y);
        dx.push(33, this.startPoint?.z);

        dx.push(14, this.endPoint?.x);
        dx.push(24, this.endPoint?.y);
        dx.push(34, this.endPoint?.z);

        dx.push(15, this.center?.x);
        dx.push(25, this.center?.y);
        dx.push(35, this.center?.z);

        dx.push(40, this.startAngle);
        dx.push(41, this.endAngle);

        dx.push(70, this.isPartial);
        dx.push(71, this.hasLeader);

        dx.push(16, this.leaderPoint1?.x);
        dx.push(26, this.leaderPoint1?.y);
        dx.push(36, this.leaderPoint1?.z);

        dx.push(17, this.leaderPoint2?.x);
        dx.push(27, this.leaderPoint2?.y);
        dx.push(37, this.leaderPoint2?.z);
    }
}
