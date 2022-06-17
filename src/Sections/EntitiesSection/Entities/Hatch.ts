import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import PredefinedHatchPatterns from '../../../Internals/HatchPatterns';
import DxfInterface from '../../../Internals/Interfaces/DxfInterface';
import TagsManager, {
    point2d_t,
    point3d,
} from '../../../Internals/TagsManager';
import Entity, { options_t } from '../Entity';

export enum HatchPredefinedPatterns {
    SOLID = 'SOLID',
    ANGLE = 'ANGLE',
    ANSI31 = 'ANSI31',
    ANSI32 = 'ANSI32',
    ANSI33 = 'ANSI33',
    ANSI34 = 'ANSI34',
    ANSI35 = 'ANSI35',
    ANSI36 = 'ANSI36',
    ANSI37 = 'ANSI37',
    ANSI38 = 'ANSI38',
    AR_B816 = 'AR_B816',
    AR_B816C = 'AR_B816C',
    AR_B88 = 'AR_B88',
    AR_BRELM = 'AR_BRELM',
    AR_BRSTD = 'AR_BRSTD',
    AR_CONC = 'AR_CONC',
    AR_HBONE = 'AR_HBONE',
    AR_PARQ1 = 'AR_PARQ1',
    AR_RROOF = 'AR_RROOF',
    AR_RSHKE = 'AR_RSHKE',
    AR_SAND = 'AR_SAND',
    BOX = 'BOX',
    BRASS = 'BRASS',
    BRICK = 'BRICK',
    BRSTONE = 'BRSTONE',
    CLAY = 'CLAY',
    CORK = 'CORK',
    CROSS = 'CROSS',
    DASH = 'DASH',
    DOLMIT = 'DOLMIT',
    DOTS = 'DOTS',
    EARTH = 'EARTH',
    ESCHER = 'ESCHER',
    FLEX = 'FLEX',
    GOST_GLASS = 'GOST_GLASS',
    GOST_WOOD = 'GOST_WOOD',
    GOST_GROUND = 'GOST_GROUND',
    GRASS = 'GRASS',
    GRATE = 'GRATE',
    GRAVEL = 'GRAVEL',
    HEX = 'HEX',
    HONEY = 'HONEY',
    HOUND = 'HOUND',
    INSUL = 'INSUL',
    ACAD_ISO02W100 = 'ACAD_ISO02W100',
    ACAD_ISO03W100 = 'ACAD_ISO03W100',
    ACAD_ISO04W100 = 'ACAD_ISO04W100',
    ACAD_ISO05W100 = 'ACAD_ISO05W100',
    ACAD_ISO06W100 = 'ACAD_ISO06W100',
    ACAD_ISO07W100 = 'ACAD_ISO07W100',
    ACAD_ISO08W100 = 'ACAD_ISO08W100',
    ACAD_ISO09W100 = 'ACAD_ISO09W100',
    ACAD_ISO10W100 = 'ACAD_ISO10W100',
    ACAD_ISO11W100 = 'ACAD_ISO11W100',
    ACAD_ISO12W100 = 'ACAD_ISO12W100',
    ACAD_ISO13W100 = 'ACAD_ISO13W100',
    ACAD_ISO14W100 = 'ACAD_ISO14W100',
    ACAD_ISO15W100 = 'ACAD_ISO15W100',
    JIS_LC_20 = 'JIS_LC_20',
    JIS_LC_20A = 'JIS_LC_20A',
    JIS_LC_8 = 'JIS_LC_8',
    JIS_LC_8A = 'JIS_LC_8A',
    JIS_RC_10 = 'JIS_RC_10',
    JIS_RC_15 = 'JIS_RC_15',
    JIS_RC_18 = 'JIS_RC_18',
    JIS_RC_30 = 'JIS_RC_30',
    JIS_STN_1E = 'JIS_STN_1E',
    JIS_STN_2_5 = 'JIS_STN_2_5',
    JIS_WOOD = 'JIS_WOOD',
    LINE = 'LINE',
    MUDST = 'MUDST',
    NET = 'NET',
    NET3 = 'NET3',
    PLAST = 'PLAST',
    PLASTI = 'PLASTI',
    SACNCR = 'SACNCR',
    SQUARE = 'SQUARE',
    STARS = 'STARS',
    STEEL = 'STEEL',
    SWAMP = 'SWAMP',
    TRANS = 'TRANS',
    TRIANG = 'TRIANG',
    ZIGZAG = 'ZIGZAG',
}

export enum SolidFillFlag {
    SolidFill = 1,
    PatternFill = 0,
}

export enum AssociativityFlag {
    NonAssociative = 0,
    Associative = 1,
}

export enum HatchStyle {
    Normal = 0,
    Outer = 1,
    Ignore = 2,
}

export enum HatchPatternType {
    UserDefined = 0,
    Predifined = 1,
    Custom = 2,
}

export type HatchOptions_t = options_t & {
    elevation?: number;
    fillFlag?: SolidFillFlag;
    associativityFlag?: AssociativityFlag;
    hatchStyle?: HatchStyle;
    patternType?: HatchPatternType;
    angle?: number
    scale?: number;
};

export type HatchPolylineVertex_t = {
    x: number;
    y: number;
    bulge?: number;
};

export class HatchPolylineBoundary implements DxfInterface {
    readonly verticies: HatchPolylineVertex_t[];

    constructor(verticies?: HatchPolylineVertex_t[]) {
        this.verticies = verticies || [];
    }

    add(vertex: HatchPolylineVertex_t) {
        this.verticies.push(vertex);
    }

    stringify(): string {
        return this.manager.stringify();
    }

    get manager(): TagsManager {
        const manager = new TagsManager();
        const bulge = this.verticies.find((v) => v.bulge) ? true : false;
        manager.add(72, Number(bulge));
        manager.add(73, 1);
        manager.add(93, this.verticies.length);
        this.verticies.forEach((v) => {
            manager.point2d(v);
            if (bulge) manager.add(42, v.bulge || 0);
        });
        return manager;
    }
}

export enum PathTypeFlag {
    Default = 0,
    External = 1,
    Polyline = 2,
    Derived = 4,
    Textbox = 8,
    Outermost = 16,
}

export class HatchBoundaryPath implements DxfInterface {
    pathTypeFlag: PathTypeFlag;
    polylineBoundary: HatchPolylineBoundary | null;
    edgesTypeData: HatchEdgesTypeData | null;

    constructor() {
        this.pathTypeFlag = PathTypeFlag.External | PathTypeFlag.Derived;
        this.polylineBoundary = null;
        this.edgesTypeData = null;
    }

    setPolylineBoundary(polylineBoundary: HatchPolylineBoundary) {
        if (
            (this.pathTypeFlag & PathTypeFlag.Polyline) !==
            PathTypeFlag.Polyline
        )
            this.pathTypeFlag |= PathTypeFlag.Polyline;
        this.polylineBoundary = polylineBoundary;
    }

    setEdgesTypeData(edgesTypeData: HatchEdgesTypeData) {
        if (
            (this.pathTypeFlag & PathTypeFlag.Polyline) !==
            PathTypeFlag.Polyline
        )
            this.pathTypeFlag ^= PathTypeFlag.Polyline;
        this.edgesTypeData = edgesTypeData;
    }

    stringify(): string {
        return this.manager.stringify();
    }

    get manager(): TagsManager {
        const manager = new TagsManager();
        manager.add(92, this.pathTypeFlag)
        if (
            this.polylineBoundary &&
            (this.pathTypeFlag & PathTypeFlag.Polyline) == PathTypeFlag.Polyline
        ) {
            manager.append(this.polylineBoundary);
        } else if (
            this.edgesTypeData &&
            (this.pathTypeFlag & PathTypeFlag.Polyline) !==
            PathTypeFlag.Polyline
        ) {
            manager.append(this.edgesTypeData);
        } else {
            throw new Error('The boundary path is empty!');
        }
        manager.add(97, 0)
        return manager;
    }
}

export class HatchLineEdgeData implements DxfInterface {
    start: point2d_t;
    end: point2d_t;

    constructor(start: point2d_t, end: point2d_t) {
        this.start = start;
        this.end = end;
    }

    stringify(): string {
        return this.manager.stringify();
    }

    get manager(): TagsManager {
        const manager = new TagsManager();
        manager.point2d(this.start);
        manager.point2d(this.end, 1);
        return manager;
    }
}

export class HatchArcEdgeData implements DxfInterface {
    center: point2d_t;
    raduis: number;
    startAngle: number;
    endAngle: number;
    isCounterClockwise: boolean;

    constructor(
        center: point2d_t,
        raduis: number,
        startAngle: number,
        endAngle: number,
        isCounterClockwise: boolean
    ) {
        this.center = center;
        this.raduis = raduis;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.isCounterClockwise = isCounterClockwise;
    }

    stringify(): string {
        return this.manager.stringify();
    }

    get manager(): TagsManager {
        const manager = new TagsManager();
        manager.point2d(this.center);
        manager.add(40, this.raduis);
        manager.add(50, this.startAngle);
        manager.add(51, this.endAngle);
        manager.add(73, Number(this.isCounterClockwise));
        return manager;
    }
}
export class HatchEdgesTypeData implements DxfInterface {
    edgesData: DxfInterface[];
    constructor() {
        this.edgesData = [];
    }

    addLineEdgeData(start: point2d_t, end: point2d_t) {
        this.edgesData.push(new HatchLineEdgeData(start, end));
    }

    addArcEdgeData(
        center: point2d_t,
        raduis: number,
        startAngle: number,
        endAngle: number,
        isCounterClockwise: boolean
    ) {
        this.edgesData.push(
            new HatchArcEdgeData(
                center,
                raduis,
                startAngle,
                endAngle,
                isCounterClockwise
            )
        );
    }

    stringify(): string {
        return this.manager.stringify();
    }

    get manager(): TagsManager {
        const manager = new TagsManager();
        this.edgesData.forEach((edge) => {
            manager.append(edge);
        });
        return manager;
    }
}

export default class Hatch extends Entity {
    patternName: HatchPredefinedPatterns;
    elevation: number;
    fillFlag: SolidFillFlag;
    associativityFlag: AssociativityFlag;
    hatchStyle: HatchStyle;
    patternType: HatchPatternType;
    scale: number;
    boundaryPath: HatchBoundaryPath;
    angle: number

    constructor(
        patternName: HatchPredefinedPatterns,
        options?: HatchOptions_t
    ) {
        super('HATCH', 'AcDbHatch', options);
        this.patternName = patternName;
        this.elevation = options?.elevation || 0;
        this.fillFlag = options?.fillFlag || SolidFillFlag.PatternFill;
        this.associativityFlag =
            options?.associativityFlag || AssociativityFlag.Associative;
        this.hatchStyle = options?.hatchStyle || HatchStyle.Outer;
        this.patternType = HatchPatternType.Predifined;
        this.scale = options?.scale || 1;
        this.boundaryPath = new HatchBoundaryPath();
        this.angle = options?.angle || 0
    }

    override boundingBox(): boundingBox_t {
        return BoundingBox.pointBBox(point3d(0, 0, 0));
    }

    override get manager(): TagsManager {
        const manager = new TagsManager();
        manager.push(super.manager.tags);
        manager.point3d(point3d(0, 0, this.elevation));
        manager.add(210, 0)
        manager.add(220, 0)
        manager.add(230, 1)
        manager.name(this.patternName);
        manager.add(70, this.fillFlag);
        manager.add(71, this.associativityFlag);
        manager.add(91, 1) // TODO
        manager.append(this.boundaryPath);
        manager.add(75, this.hatchStyle);
        manager.add(76, this.patternType);
        manager.add(52, this.angle);
        manager.add(41, this.scale);
        manager.add(77, 0)
        const pattern = PredefinedHatchPatterns.get(this.patternName)
        if (pattern) {
            pattern.scale = this.scale
            if (this.angle !== 0) pattern.angle = this.angle
            manager.append(pattern)
        }
        manager.add(47, 20)
        manager.add(98, 0)
        return manager;
    }
}
