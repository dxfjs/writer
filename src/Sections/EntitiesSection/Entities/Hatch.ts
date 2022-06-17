import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import DxfInterface from '../../../Internals/Interfaces/DxfInterface';
import TagsManager, { point3d } from '../../../Internals/TagsManager';
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
    scale?: number;
};

export type HatchPolylineVertex_t = {
    x: number,
    y: number,
    bulge?: number
}

export class HatchPolylineBoundary implements DxfInterface {

    readonly verticies: HatchPolylineVertex_t[]

    constructor(verticies?: HatchPolylineVertex_t[]) {
        this.verticies = verticies || []
    }

    add(vertex: HatchPolylineVertex_t) {
        this.verticies.push(vertex)
    }

    stringify(): string {
        return this.manager.stringify()
    }

    get manager(): TagsManager {
        const manager = new TagsManager();
        const bulge = this.verticies.find(v => v.bulge) ? true : false
        manager.add(72, Number(bulge))
        manager.add(73, 1)
        manager.add(93, this.verticies.length)
        this.verticies.forEach(v => {
            manager.point2d(v)
            if (bulge) manager.add(42, v.bulge || 0)
        })
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

    constructor(patternName: HatchPredefinedPatterns, options?: HatchOptions_t) {
        super('ARC', 'AcDbCircle', options);
        this.patternName = patternName;
        this.elevation = options?.elevation || 0;
        this.fillFlag = options?.fillFlag || SolidFillFlag.SolidFill;
        this.associativityFlag =
            options?.associativityFlag || AssociativityFlag.NonAssociative;
        this.hatchStyle = options?.hatchStyle || HatchStyle.Normal;
        this.patternType = options?.patternType || HatchPatternType.Predifined;
        this.scale = options?.scale || 1;
    }

    override boundingBox(): boundingBox_t {
        return BoundingBox.pointBBox(point3d(0, 0, 0));
    }

    override get manager(): TagsManager {
        const manager = new TagsManager();
        manager.push(super.manager.tags);
        manager.point3d(point3d(0, 0, this.elevation));
        manager.name(this.patternName);
        manager.add(70, this.fillFlag);
        manager.add(71, this.associativityFlag);
        // entries
        manager.add(75, this.hatchStyle);
        manager.add(76, this.patternType);

        return manager;
    }
}
