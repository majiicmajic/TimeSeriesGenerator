"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
/**Time series generator class */
class TimeSeriesGenerator {
    constructor(startDate, endDate, interval = "day") {
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.interval = interval;
        this.data = [];
    }
    generate() {
        let currentDate = new Date(this.startDate);
        while (currentDate <= this.endDate) {
            var dataSet = {
                date: currentDate.toISOString().split('T')[0],
                value: Math.random() * 100 // Random value for demonstration
            };
            this.data.push(dataSet);
            switch (this.interval) {
                case 'day':
                    currentDate.setDate(currentDate.getDate() + 1);
                    break;
                case 'week':
                    currentDate.setDate(currentDate.getDate() + 7);
                    break;
                case 'month':
                    currentDate.setMonth(currentDate.getMonth() + 1);
                    break;
                default:
                    throw new Error('Invalid interval');
            }
        }
    }
    /**helps convert to CSV */
    toCSV(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.data.length === 0) {
                throw new Error('No data to write');
            }
            const csvContent = this.data.map(item => `${item.date},${item.value}`).join('\n');
            yield writeFileAsync(filePath, `date,value\n${csvContent}`);
        });
    }
}
module.exports = TimeSeriesGenerator;
