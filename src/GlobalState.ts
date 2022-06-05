export enum Colors {
	Red = 1,
	Green = 3,
	Cyan = 4,
	Blue = 5,
	Magenta = 6,
	White = 7,
	Black = 0,
	Yellow = 2,
}

export enum Units {
	Unitless = 0,
	Inches = 1,
	Feet = 2,
	Miles = 3,
	Millimeters = 4,
	Centimeters = 5,
	Meters = 6,
	Kilometers = 7,
	Microinches = 8,
	Mils = 9,
	Yards = 10,
	Angstroms = 11,
	Nanometers = 12,
	Microns = 13,
	Decimeters = 14,
	Decameters = 15,
	Hectometers = 16,
	Gigameters = 17,
	AstronomicalUnits = 18,
	LightYears = 19,
	Parsecs = 20,
	USSurveyFeet = 21,
	USSurveyInch = 22,
	USSurveyYard = 23,
	USSurveyMile = 24,
}

export default class GlobalState {
	public static currentLayerName = '0';
	public static units: number = Units.Unitless;
}
