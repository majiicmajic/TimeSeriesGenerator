# My Time Series Generator Library

This Node.js library generates time series data with seasonality, trend, and noise.

## Installation

To install the library, use npm:

```sh
npm i majic-ts


## Usage

Create an instance of the `TimeSeriesGenerator` class with the desired parameters and call the `writeToCSV` method to generate and save the time series data to a CSV file.

```javascript
const { TimeSeriesGenerator } = require('../generateSim');

// Example usage
const generator = new TimeSeriesGenerator(0, 10, 0.1, 2, 0.5, 0.5);
generator.writeToCSV('time_series_data.csv');


## Parameters

| Parameter | Description |
|-----------|-------------|
| `startTime` | The start time of the time series. |
| `endTime` | The end time of the time series. |
| `timeInterval` | The time interval between data points. |
| `seasonalityAmplitude` | The amplitude of the seasonality component. |
| `trendSlope` | The slope of the trend component. |
| `noiseLevel` | The level of noise to add to the data. |

## License

This project is licensed under the ISC License.
