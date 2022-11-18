import Entity, { CommonEntityOptions } from '../Entity';
import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox';
import { Dxfier } from 'Internals/Dxfier';
import { vec2_t, point3d } from 'Internals/Helpers';

export enum ArrowHeadFlags {
    ArrowHeadDisabed = 0,
    ArrowHeadEnabled = 1,
}

export enum PathType {
    StarightLine = 0,
    Spline = 1,
}

export interface LeaderVertex {
    point: vec2_t;
}

export interface LeaderOptions extends CommonEntityOptions {
    flags?: ArrowHeadFlags;
    pathType?: PathType;
}

export class Leader extends Entity {
    flags: ArrowHeadFlags;
    pathType: PathType;
    vertices: LeaderVertex[];

    public constructor(vertices: LeaderVertex[], options?: LeaderOptions) {
        super('LEADER', 'AcDbLeader', options);
        this.vertices = vertices;
        this.flags = options?.flags ?? ArrowHeadFlags.ArrowHeadEnabled;
        this.pathType = options?.pathType ?? PathType.StarightLine;
    }

    override boundingBox(): boundingBox_t {
        return BoundingBox.verticesBBox(
            this.vertices.map((vertex) => point3d(vertex.point.x, vertex.point.y, 0))
        );
    }

    override dxfy(dx: Dxfier): void {
        super.dxfy(dx);
        dx.push(71, this.flags);
        dx.push(72, this.pathType);
        dx.push(76, this.vertices.length);
        for (const v of this.vertices) {
            dx.point2d(v.point);
        }
    }
}