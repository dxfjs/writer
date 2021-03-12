import Tag                          from "./Tag";
import DXFInterface                 from "./Interfaces/DXFInterface";
import NameComponent                from "./Components/NameComponent";
import ColorComponent               from "./Components/ColorComponent";
import LayerComponent               from "./Components/LayerComponent";
import PointComponent               from "./Components/PointComponent";
import HandleComponent              from "./Components/HandleComponent";
import LineTypeComponent            from "./Components/LineTypeComponent";
import StandardComponent            from "./Components/StandardComponent";
import TextStyleComponent           from "./Components/TextStyleComponent";
import ThicknessComponent           from "./Components/ThicknessComponent";
import TrueColorComponent           from "./Components/TrueColorComponent";
import EntityTypeComponent          from "./Components/EntityTypeComponent";
import SubclassMarkerComponent      from "./Components/SubclassMarkerComponent";
import SoftOwnerHandleComponent     from "./Components/SoftOwnerHandleComponent";
import HardOwnerHandleComponent     from "./Components/HardOwnerHandleComponent";
import SoftPointerHandleComponent   from "./Components/SoftPointerHandleComponent";
import HardPointerHandleComponent   from "./Components/HardPointerHandleComponent";

export default class DXFManager implements DXFInterface {
    get handle(): string {
        return this._handle;
    }
    set handle(value: string) {
        this._handle = value;
    }
    static versions = {
        R12:    "AC1009", R13:      "AC1012", R14:      "AC1014",
        R2000:  "AC1015", R2004:    "AC1018", R2007:    "AC1021",
        R2010:  "AC1024", R2013:    "AC1027"//, R2018:    "AC1032"
    };
    static colors = {
        Red:        1, Green:      3, Cyan:       4,
        Blue:       5, Magenta:    6, White:      7,
        Black:      0, Yellow:     2,
    }
    static units = {
        Unitless:           0,  Inches:         1,  Feet:           2,
        Miles:              3,  Millimeters:    4,  Centimeters:    5,
        Meters:             6,  Kilometers:     7,  Microinches:    8,
        Mils:               9,  Yards:          10, Angstroms:      11,
        Nanometers:         12, Microns:        13, Decimeters:     14,
        Decameters:         15, Hectometers:    16, Gigameters:     17,
        AstronomicalUnits:  18, LightYears:     19, Parsecs:        20,
        USSurveyFeet:       21, USSurveyInch:   22, USSurveyYard:   23,
        USSurveyMile:       24,
    }
    static version:         string = DXFManager.versions.R2007;
    static handleSeed:      number = 0;
    private _handle:        string;
    static currentLayer:    string = '0';
    public constructor() {
        this._handle = this.handleSeed();
    }

    public isInteger(value: number): boolean {
        return Number(value) === value && value % 1 === 0;
    }
    public isFloat(value: number): boolean {
        return Number(value) === value && value % 1 !== 0;
    }
    public isSupported(version: string): boolean {
        const fileVersion = parseInt(DXFManager.version.replace('AC', ''));
        const tagVersion = parseInt(version.replace('AC', ''));
        return tagVersion <= fileVersion;
    }
    public handleSeed (): string
    {
        DXFManager.handleSeed++;
        return DXFManager.handleSeed.toString(16).toUpperCase();
    }

    tags(): Tag[] {
        return [];
    }

    public stringify(): string {
        return this.tags().reduce((str, tag) => {
            if (this.isSupported(tag.version)) {

                return `${str}${tag.stringify()}`;
            } else {
                console.log(this.isSupported(tag.version));
            }
            return str;
        }, '');
    }

    public color(index: number): Tag[] {
        return new ColorComponent(index).tags();
    }
    public entityType(name: string): Tag[] {
        return new EntityTypeComponent(name).tags();
    }
    public hand(handle: string): Tag[] {
        return new HandleComponent(handle).tags();
    }
    public layer(layer: string): Tag[] {
        return new LayerComponent(layer).tags();
    }
    public lineType(lineType: string): Tag[] {
        return new LineTypeComponent(lineType).tags();
    }
    public name(name: string, groupCode: number = 2): Tag[] {
        return new NameComponent(name, groupCode).tags();
    }

    public point(
        x: number, y: number, z: number = 0,
        is3D: boolean = false, digit: number = 0
    ): Tag[] {
        return new PointComponent(x, y, z, is3D, digit).tags();
    }
    public standard(tagsArray: [number, number | string][]): Tag[] {
        return new StandardComponent(tagsArray).tags();
    }
    public subclassMarker(subclass: string): Tag[] {
        return new SubclassMarkerComponent(subclass).tags();
    }
    public textStyle(textStyleName: string): Tag[] {
        return new TextStyleComponent(textStyleName).tags();
    }
    public thickness(thickness : number): Tag[] {
        return new ThicknessComponent(thickness).tags();
    }
    public trueColor(
        red: number, green: number, blue: number, digit: number = 0
    ): Tag[] {
        return new TrueColorComponent(red, green, blue, digit).tags();
    }
    public softPointerHandle(softPointerHandle: string, digit: number = 0): Tag[] {
        return new SoftPointerHandleComponent(softPointerHandle, digit).tags();
    }
    public softOwnerHandle(softOwnerHandle: string, digit: number = 0): Tag[] {
        return new SoftOwnerHandleComponent(softOwnerHandle, digit).tags();
    }
    public hardPointerHandle(hardPointerHandle: string, digit: number = 0): Tag[] {
        return new HardPointerHandleComponent(hardPointerHandle, digit).tags();
    }
    public hardOwnerHandle(hardOwnerHandle: string, digit: number = 0): Tag[] {
        return new HardOwnerHandleComponent(hardOwnerHandle, digit).tags();
    }
};
