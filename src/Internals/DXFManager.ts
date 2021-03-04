import NameComponent            from "./Components/NameComponent.js";
import ColorComponent           from "./Components/ColorComponent.js";
import LayerComponent           from "./Components/LayerComponent.js";
import PointComponent           from "./Components/PointComponent.js";
import HandleComponent          from "./Components/HandleComponent.js";
import LineTypeComponent        from "./Components/LineTypeComponent.js";
import StandardComponent        from "./Components/StandardComponent.js";
import TextStyleComponent       from "./Components/TextStyleComponent.js";
import ThicknessComponent       from "./Components/ThicknessComponent.js";
import TrueColorComponent       from "./Components/TrueColorComponent.js";
import EntityTypeComponent      from "./Components/EntityTypeComponent.js";
import SubclassMarkerComponent  from "./Components/SubclassMarkerComponent.js";

export default class DXFManager {
    get handle(): string {
        return this._handle;
    }
    set handle(value: string) {
        this._handle = value;
    }
    static versions = {
        R12:    "AC1009", R13:      "AC1012", R14:      "AC1014",
        R2000:  "AC1015", R2004:    "AC1018", R2007:    "AC1021",
        R2010:  "AC1024", R2013:    "AC1027", R2018:    "AC1032"
    };
    static colors = {
        Red:        1, Green:      3, Cyan:       4,
        Blue:       5, Magenta:    6, White:      7,
        Black:      0, Yellow:     2,
    }
    static units = {
        Unitless: 0,
        Inches: 1,
        Feet: 2,
        Miles: 3,
        Millimeters: 4,
        Centimeters: 5,
        Meters: 6,
        Kilometers: 7,
        Microinches: 8,
        Mils: 9,
        Yards: 10,
        Angstroms: 11,
        Nanometers: 12,
        Microns: 13,
        Decimeters: 14,
        Decameters: 15,
        Hectometers: 16,
        Gigameters: 17,
        AstronomicalUnits: 18,
        LightYears: 19,
        Parsecs: 20,
        USSurveyFeet: 21,
        USSurveyInch: 22,
        USSurveyYard: 23,
        USSurveyMile: 24,
    }
    static version:         string;
    static handleSeed:      number = 0;
    private _handle:        string;
    static currentLayer:    string = '0';
    protected constructor() {
        this._handle = this.handleSeed();
    }
    protected isInteger(value: number): boolean {
        return Number(value) === value && value % 1 === 0;
    }
    protected isFloat(value: number): boolean {
        return Number(value) === value && value % 1 !== 0;
    }
    protected isSupported(version: string): boolean {
        const fileVersion = parseInt(DXFManager.version.replace('AC', ''));
        const tagVersion = parseInt(version.replace('AC', ''));
        return tagVersion <= fileVersion;
    }
    public handleSeed (): string
    {
        DXFManager.handleSeed++;
        return DXFManager.handleSeed.toString(16).toUpperCase();
    }

    public color(index: number): ColorComponent {
        return new ColorComponent(index);
    }
    public entityType(name: string): EntityTypeComponent {
        return new EntityTypeComponent(name);
    }
    public hand(handle: string): HandleComponent {
        return new HandleComponent(handle);
    }
    public layer(layer: string): LayerComponent {
        return new LayerComponent(layer);
    }
    public lineType(lineType: string): LineTypeComponent {
        return new LineTypeComponent(lineType);
    }
    public name(name: string, groupCode: number = 2): NameComponent {
        return new NameComponent(name, groupCode);
    }
    public point(
        x: number, y: number, z: number,
        is3D: boolean = false, digit: number = 0
    ): PointComponent {
        return new PointComponent(x, y, z, is3D, digit);
    }
    public standard(tagsArray: [number, number | string][]): StandardComponent {
        return new StandardComponent(tagsArray);
    }
    public subclassMarker(subclass: string): SubclassMarkerComponent {
        return new SubclassMarkerComponent(subclass);
    }
    public textStyle(textStyleName: string): TextStyleComponent {
        return new TextStyleComponent(textStyleName);
    }
    public thickness(thickness : number): ThicknessComponent {
        return new ThicknessComponent(thickness);
    }
    public trueColor(red: number, green: number, blue: number, digit: number = 0): TrueColorComponent {
        return new TrueColorComponent(red, green, blue, digit);
    }
};
