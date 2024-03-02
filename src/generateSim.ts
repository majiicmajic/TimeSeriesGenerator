const fs = require('fs');

export class TimeSeriesGenerator {
    startTime: number;
    endTime: number;
    timeInterval: number;
    seasonalityAmplitude: number;
    trendSlope: number;
    noiseLevel: number;
    
    /**
     * Initialise a class that creates a time series generator with seasonality, trends, and noise
     * @param startTime 
     * @param endTime 
     * @param timeInterval 
     * @param seasonalityAmplitude 
     * @param trendSlope 
     * @param noiseLevel 
     */
    constructor(startTime: number, endTime: number, timeInterval: number, seasonalityAmplitude: number, trendSlope: number, noiseLevel: number) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.timeInterval = timeInterval;
        this.seasonalityAmplitude = seasonalityAmplitude;
        this.trendSlope = trendSlope;
        this.noiseLevel = noiseLevel;
    }

    generateTimeSeries(func: { (t: any): number; (t: any): number; (arg0: any): any; }) {
        let data = [];
        for (let t = this.startTime; t <= this.endTime; t += this.timeInterval) {
            let value = func(t);
            data.push({ time: t, value: value });
        }
        return data;
    }

    addNoise(data: any[]) {
        return data.map((point: { time: any; value: number; }) => {
            return { time: point.time, value: point.value + (Math.random() * 2 - 1) * this.noiseLevel };
        });
    }

    generate() {
        const seasonality = (t: number) => {
            return this.seasonalityAmplitude * Math.sin(t);
        }

        const trend = (t: number) => {
            return this.trendSlope * t;
        }

        let seasonalityData = this.generateTimeSeries(seasonality.bind(this));
        let trendData = this.generateTimeSeries(trend.bind(this));
        let noiseData = this.addNoise(trendData);

        let combinedData = seasonalityData.map((point, index) => {
            return { time: point.time, value: point.value + noiseData[index].value };
        });

        return combinedData;
    }

    writeToCSV(filename: string) {
        let csvContent = "Time,Value\n";
        this.generate().forEach(point => {
            csvContent += `${point.time},${point.value}\n`;
        });

        fs.writeFileSync(filename, csvContent);
    }
}

// Example usage
//const generator = new TimeSeriesGenerator(0, 10, 0.1, 2, 0.5, 0.5);
//generator.writeToCSV('time_series_data.csv');
