const fs = require('fs').promises;
const TimeSeriesGenerator = require('./timeseries-generator');

describe('TimeSeriesGenerator', () => {
  it('generates time series data for a month', () => {
    const startDate = '2024-01-01';
    const endDate = '2024-01-31';
    const generator = new TimeSeriesGenerator(startDate, endDate, 'day');
    generator.generate();

    expect(generator.data.length).toBe(31);
  });

  it('generates time series data for a year', () => {
    const startDate = '2024-01-01';
    const endDate = '2024-12-31';
    const generator = new TimeSeriesGenerator(startDate, endDate, 'month');
    generator.generate();

    expect(generator.data.length).toBe(12);
  });

  it('writes generated data to a CSV file', async () => {
    const startDate = '2024-01-01';
    const endDate = '2024-01-31';
    const generator = new TimeSeriesGenerator(startDate, endDate, 'day');
    generator.generate();

    await generator.toCSV('output.csv');

    const csvContent = await fs.readFile('output.csv', 'utf8');
    const lines = csvContent.trim().split('\n');
    // // Assuming each line represents a day in the month
    expect(lines.length).toBe(32);
    // // You can add more assertions to check the content of each line if needed
  });
});

