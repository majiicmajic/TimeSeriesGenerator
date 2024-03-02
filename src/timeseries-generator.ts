import { datasetI } from "./interfaces/dataset";

const fs = require('fs');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

/**Time series generator class */
 class TimeSeriesGenerator {
  data: datasetI[];
   startDate: Date;
   endDate: Date;
   interval: intervalType;



  constructor(startDate:string, endDate: string, interval:intervalType = "day") {
    this.startDate  = new Date(startDate);
    this.endDate = new Date(endDate);
    this.interval = interval;
    this.data = []
  }

  generate() {
    let currentDate = new Date(this.startDate);

    while (currentDate <= this.endDate) {
     var dataSet: datasetI = {
        date: currentDate.toISOString().split('T')[0],
        value: Math.random() * 100 // Random value for demonstration
      }
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
  async toCSV(filePath:string) {
    if (this.data.length === 0) {
      throw new Error('No data to write');
    }

    const csvContent = this.data.map(item => `${item.date},${item.value}`).join('\n');

    await writeFileAsync(filePath, `date,value\n${csvContent}`);
  }
}

module.exports = TimeSeriesGenerator;
