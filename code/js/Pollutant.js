/**
 * Data structure for the each pollutant's 
 * available information in the dataset for a state
 * over a time period.
 */
 
class Pollutant {

	/*
		@param name is the the name of the pollutant
		@param unit is the units of pollutant
		@param mean is the mean pollutant level
		@param maxLevel is the maximum level of the pollutant
		@param minLevel is the minimum level of the pollutant
		@param AQI is the Air Quality India of the pollutant (Check, how?)
		@param timePeriod specifies the time period for which the pollutant level is stored
		@param date specifies the date belonging to the time period: eg. Year: 2019 or Month: Mar, 2019
	*/
	
	constructor(name, unit, mean, maxLevel, minLevel, AQI, timePeriod, date) {
		this.name = name;
		this.unit = unit;
		this.mean = mean;
		this.maxLevel = maxLevel;
		this.minLevel = minLevel;
		this.AQI = AQI;
		this.timePeriod = timePeriod;
		this.date = date;
	}
}
