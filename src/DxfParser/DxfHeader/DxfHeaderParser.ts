import { value } from '../DxfTables/DxfTablesParser';
import Tokenizer, { section, token_t } from '../Tokenizer';
import { DxfHeaderSpecification } from './DxfHeaderSpecification';

export function variable(token: token_t) {
    return token.code === 9;
}

export type Point = {
    x: number;
    y: number;
    z?: number;
};

export interface Header {
    $ACADMAINTVER: number;
    $ACADVER: string;
    $ANGBASE: number;
    $ANGDIR: number;
    $ATTMODE: number;
    $AUNITS: number;
    $AUPREC: number;
    $CECOLOR: number;
    $CELTSCALE: number;
    $CELTYPE: string;
    $CELWEIGHT: number;
    $CEPSNID: string;
    $CEPSNTYPE: number;
    $CHAMFERA: number;
    $CHAMFERB: number;
    $CHAMFERC: number;
    $CHAMFERD: number;
    $CLAYER: string;
    $CMLJUST: number;
    $CMLSCALE: number;
    $CMLSTYLE: string;
    $CSHADOW: number;
    $DIMADEC: number;
    $DIMALT: number;
    $DIMALTD: number;
    $DIMALTF: number;
    $DIMALTRND: number;
    $DIMALTTD: number;
    $DIMALTTZ: number;
    $DIMALTU: number;
    $DIMALTZ: number;
    $DIMAPOST: number;
    $DIMASO: number;
    $DIMASSOC: number;
    $DIMASZ: number;
    $DIMATFIT: number;
    $DIMAUNIT: number;
    $DIMAZIN: number;
    $DIMBLK: string;
    $DIMBLK1: string;
    $DIMBLK2: string;
    $DIMCEN: number;
    $DIMCLRD: number;
    $DIMCLRE: number;
    $DIMCLRT: number;
    $DIMDEC: number;
    $DIMDLE: number;
    $DIMDLI: number;
    $DIMDSEP: number;
    $DIMEXE: number;
    $DIMEXO: number;
    $DIMFAC: number;
    $DIMGAP: number;
    $DIMJUST: number;
    $DIMLDRBLK: string;
    $DIMLFAC: number;
    $DIMLIM: number;
    $DIMLUNIT: number;
    $DIMLWD: number;
    $DIMLWE: number;
    $DIMPOST: string;
    $DIMRND: number;
    $DIMSAH: number;
    $DIMSCALE: number;
    $DIMSD1: number;
    $DIMSD2: number;
    $DIMSE1: number;
    $DIMSE2: number;
    $DIMSHO: number;
    $DIMSOXD: number;
    $DIMSTYLE: string;
    $DIMTAD: number;
    $DIMTDEC: number;
    $DIMTFAC: number;
    $DIMTIH: number;
    $DIMTIX: number;
    $DIMTM: number;
    $DIMTMOVE: number;
    $DIMTOFL: number;
    $DIMTOH: number;
    $DIMTOL: number;
    $DIMTOLJ: number;
    $DIMTP: number;
    $DIMTSZ: number;
    $DIMTVP: number;
    $DIMTXSTY: string;
    $DIMTXT: number;
    $DIMTZIN: number;
    $DIMUPT: number;
    $DIMZIN: number;
    $DISPSILH: number;
    $DRAGVS: string;
    $DWGCODEPAGE: string;
    $ELEVATION: number;
    $ENDCAPS: number;
    $EXTMAX: Point;
    $EXTMIN: Point;
    $EXTNAMES: boolean;
    $FILLETRAD: number;
    $FILLMODE: number;
    $FINGERPRINTGUID: string;
    $HALOGAP: number;
    $HANDSEED: string;
    $HIDETEXT: boolean;
    $HYPERLINKBASE: number;
    $INDEXCTL: number;
    $INSBASE: Point;
    $INSUNITS: number;
    $INTERFERECOLOR: number;
    $INTERFEREOBJVS: string;
    $INTERFEREVPVS: string;
    $INTERSECTIONCOLOR: number;
    $INTERSECTIONDISPLAY: boolean;
    $JOINSTYLE: number;
    $LIMCHECK: number;
    $LIMMAX: Point;
    $LIMMIN: Point;
    $LTSCALE: number;
    $LUNITS: number;
    $LUPREC: number;
    $LWDISPLAY: boolean;
    $MAXACTVP: number;
    $MEASUREMENT: number;
    $MENU: string;
    $MIRRTEXT: number;
    $OBSCOLOR: number;
    $OBSLTYPE: number;
    $ORTHOMODE: number;
    $PDMODE: number;
    $PDSIZE: number;
    $PELEVATION: number;
    $PEXTMAX: Point;
    $PEXTMIN: Point;
    $PINSBASE: Point;
    $PLIMCHECK: number;
    $PLIMMAX: Point;
    $PLIMMIN: Point;
    $PLINEGEN: number;
    $PLINEWID: number;
    $PROJECTNAME: string;
    $PROXYGRAPHICS: number;
    $PSLTSCALE: number;
    $PSTYLEMODE: boolean;
    $PSVPSCALE: number;
    $PUCSBASE: string;
    $PUCSNAME: string;
    $PUCSORG: Point;
    $PUCSORGBACK: Point;
    $PUCSORGBOTTOM: Point;
    $PUCSORGFRONT: Point;
    $PUCSORGLEFT: Point;
    $PUCSORGRIGHT: Point;
    $PUCSORGTOP: Point;
    $PUCSORTHOREF: string;
    $PUCSORTHOVIEW: number;
    $PUCSXDIR: Point;
    $PUCSYDIR: Point;
    $QTEXTMODE: number;
    $REGENMODE: number;
    $SHADEDGE: number;
    $SHADEDIF: number;
    $SHADOWPLANELOCATION: number;
    $SKETCHINC: number;
    $SKPOLY: number;
    $SORTENTS: number;
    $SPLINESEGS: number;
    $SPLINETYPE: number;
    $SURFTAB1: number;
    $SURFTAB2: number;
    $SURFTYPE: number;
    $SURFU: number;
    $SURFV: number;
    $TDCREATE: number;
    $TDINDWG: number;
    $TDUCREATE: number;
    $TDUPDATE: number;
    $TDUSRTIMER: number;
    $TDUUPDATE: number;
    $TEXTSIZE: number;
    $TEXTSTYLE: string;
    $THICKNESS: number;
    $TILEMODE: number;
    $TRACEWID: number;
    $TREEDEPTH: number;
    $UCSBASE: string;
    $UCSNAME: string;
    $UCSORG: Point;
    $UCSORGBACK: Point;
    $UCSORGBOTTOM: Point;
    $UCSORGFRONT: Point;
    $UCSORGLEFT: Point;
    $UCSORGRIGHT: Point;
    $UCSORGTOP: Point;
    $UCSORTHOREF: string;
    $UCSORTHOVIEW: number;
    $UCSXDIR: Point;
    $UCSYDIR: Point;
    $UNITMODE: number;
    $USERI1: number;
    $USERR1: number;
    $USRTIMER: number;
    $VERSIONGUID: string;
    $VISRETAIN: number;
    $WORLDVIEW: number;
    $XCLIPFRAME: boolean;
    $XEDIT: boolean;
    [key: string]: string | boolean | number | Point;
}

export default class DxfHeaderParser {
    header: Partial<Header>;

    constructor() {
        this.header = {} as Partial<Header>;
    }

    parseVariable(tokenizer: Tokenizer) {
        const name = tokenizer.next()?.value!;
        const values = DxfHeaderSpecification.get(name);
        if (values) {
            if (Array.isArray(values)) {
                const point: Point = {} as Point;
                values.forEach((val) => {
                    if (tokenizer.hasNext() && tokenizer.peek()?.code === val) {
                        if (val === 10)
                            point.x = value(tokenizer.next()!) as number;
                        else if (val === 20)
                            point.y = value(tokenizer.next()!) as number;
                        else if (val === 30)
                            point.z = value(tokenizer.next()!) as number;
                    } else
                        throw new Error(
                            `Unexpected group code at line ${tokenizer.cline}!`
                        );
                });
                this.header[name] = point;
            } else {
                if (tokenizer.hasNext() && tokenizer.peek()?.code === values) {
                    this.header[name] = value(tokenizer.next()!);
                } else
                    throw new Error(
                        `Unexpected group code at line ${tokenizer.cline}!`
                    );
            }
        } else {
            tokenizer.next();
        }
    }

    parse(tokenizer: Tokenizer) {
        tokenizer.advance(2);
        while (tokenizer.hasNext() && tokenizer.exceptSectionOrEof()) {
            if (tokenizer.is(variable)) {
                this.parseVariable(tokenizer);
            } else tokenizer.next();
        }
    }

    objectify() {
        return {
            header: this.header,
        };
    }

    static match(tokenizer: Tokenizer) {
        return tokenizer.type('HEADER', section);
    }
}
