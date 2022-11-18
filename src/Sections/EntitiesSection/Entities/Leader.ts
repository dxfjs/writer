import Entity, { CommonEntityOptions } from '../Entity';
import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox';
import { Dxfier } from 'Internals/Dxfier';
import { point3d, vec3_t } from 'Internals/Helpers';

export enum ArrowHeadFlag {
    Disabed = 0,
    Enabled = 1,
}

export enum LeaderPathType {
    StraightLine = 0,
    Spline = 1,
}

export interface LeaderOptions extends CommonEntityOptions {
    flag?: ArrowHeadFlag;
    leaderPathType?: LeaderPathType;
}

export class Leader extends Entity {
    flag: ArrowHeadFlag;
    leaderPathType: LeaderPathType;
    vertices: vec3_t[];

    public constructor(vertices: vec3_t[], options?: LeaderOptions) {
        super('LEADER', 'AcDbLeader', options);
        this.vertices = vertices;
        this.flag = options?.flag ?? ArrowHeadFlag.Enabled;
        this.leaderPathType = options?.leaderPathType ?? LeaderPathType.StraightLine;
    }

    override boundingBox(): boundingBox_t {
        return BoundingBox.verticesBBox(
            this.vertices.map((vertex) => point3d(vertex.x, vertex.y, vertex.z))
        );
    }

    override dxfy(dx: Dxfier): void {
        super.dxfy(dx);
        dx.push(71, this.flag);
        dx.push(72, this.leaderPathType);
        dx.push(76, this.vertices.length);
        for (const v of this.vertices) {
            dx.point3d(v);
        }
    }
}