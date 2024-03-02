const fs = require('fs');
const { TimeSeriesGenerator } = require('../generateSim');

describe('TimeSeriesGenerator', () => {
    it('should generate time series data without errors', () => {
        const generator = new TimeSeriesGenerator(0, 10, 0.1, 2, 0.5, 0.5);
        const data = generator.generate();

        expect(data).toHaveLength(101); // Number of data points in the example
        data.forEach(point => {
            expect(point).toHaveProperty('time');
            expect(point).toHaveProperty('value');
        });
    });

    it('should write data to CSV file without errors', () => {
        const generator = new TimeSeriesGenerator(0, 10, 0.1, 2, 0.5, 0.5);
        const filename = 'test_data.csv';
        generator.writeToCSV(filename);

        // Check if the file was created
        expect(fs.existsSync(filename)).toBe(true);

        // Check the content of the file (assuming known data)
        const fileContent = fs.readFileSync(filename, 'utf8');
        const lines = fileContent.trim().split('\n');
        expect(lines.length).toBe(102); // Header + 101 data points
        expect(lines[0]).toBe('Time,Value');
        // Add more checks for the content if needed
    });
});
