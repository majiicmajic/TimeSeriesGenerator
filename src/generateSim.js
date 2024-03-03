"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSeriesGenerator = void 0;
const fs = require('fs');
class TimeSeriesGenerator {
    /**
     * Initialise a class that creates a time series generator with seasonality, trends, and noise
     * @param startTime
     * @param endTime
     * @param timeInterval
     * @param seasonalityAmplitude
     * @param trendSlope
     * @param noiseLevel
     */
    constructor(startTime, endTime, timeInterval, seasonalityAmplitude, trendSlope, noiseLevel) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.timeInterval = timeInterval;
        this.seasonalityAmplitude = seasonalityAmplitude;
        this.trendSlope = trendSlope;
        this.noiseLevel = noiseLevel;
    }
    generateTimeSeries(func) {
        let data = [];
        for (let t = this.startTime; t <= this.endTime; t += this.timeInterval) {
            let value = func(t);
            data.push({ time: t, value: value });
        }
        return data;
    }
    addNoise(data) {
        return data.map((point) => {
            const res = { time: point.time, value: point.value + (Math.random() * 2 - 1) * this.noiseLevel };
            return res;
        });
    }
    generate() {
        const seasonality = (t) => {
            return this.seasonalityAmplitude * Math.sin(t);
        };
        const trend = (t) => {
            return this.trendSlope * t;
        };
        let seasonalityData = this.generateTimeSeries(seasonality.bind(this));
        let trendData = this.generateTimeSeries(trend.bind(this));
        let noiseData = this.addNoise(trendData);
        let combinedData = seasonalityData.map((point, index) => {
            return { time: point.time, value: point.value + noiseData[index].value };
        });
        return combinedData;
    }
    writeToCSV(filename) {
        let csvContent = "Time,Value\n";
        this.generate().forEach(point => {
            csvContent += `${point.time},${point.value}\n`;
        });
        fs.writeFileSync(filename, csvContent);
    }
}
exports.TimeSeriesGenerator = TimeSeriesGenerator;
// Example usage
//const generator = new TimeSeriesGenerator(0, 10, 0.1, 2, 0.5, 0.5);
//generator.writeToCSV('time_series_data.csv');
