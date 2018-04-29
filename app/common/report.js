'use strict';

const https = require('https');
const parseMETAR = require('metar');

const HOST = 'avwx.rest';
const API_BASE = '/api/metar/';

module.exports = {
    'getMetarReportFor': function (icaoCode) {
        return new Promise((resolve, reject) => {
            let path = API_BASE + icaoCode + '?options=speech';
            let options = {
                host: HOST,
                path: path,
            }
            https.get(options, (res) => {
                let body = '';
                res.on('data', (d) => {
                    body += d;
                });
                res.on('end', () => {
                    if (res.statusCode < 200 || res.statusCode > 299) {
                        try {
                            let json = JSON.parse(body);
                            let error = json.Error;
                            if (error && error.startsWith('Station Lookup Error: METAR not found for')) {
                                reject(new Error('ICAO code not found'));
                                return;
                            }
                        } catch (e) {
                        }
                        reject(new Error('general error calling API'));
                        return;
                    }
                    let metarReport = JSON.parse(body);
                    resolve(
                        generateSpeechOutputForRawMetarReport(metarReport['Raw-Report'])
                    );
                });
                res.on('error', (error) => {
                    reject(error);
                });
            });
        });
    },
};

const parseAltimeter = function (metarReport) {
    let speechOutput = 'Altimeter: ';
    if (metarReport.altimeterInHpa) {
        return speechOutput + pronounceDigits(removeDecimalPointOrComma(metarReport.altimeterInHpa)) + ' hectopascals. ';
    }
    return speechOutput + '<say-as interpret-as="unit">' + pronounceDigits(removeDecimalPointOrComma(metarReport.altimeterInHg)) + ' inHg</say-as>. ';
};

const parseCloud = function (cloud) {
    switch (cloud.abbreviation) {
        case 'NSC':
            return 'nil significant cloud';
        case 'NCD':
            return 'no clouds detected';
        case 'CAVOK':
            return undefined;
        case 'FEW':
            return 'few clouds at ' + cloud.altitude + 'ft';
        case 'SCT':
            return 'scattered layer at ' + cloud.altitude + 'ft';
        case 'BKN':
            return 'broken layer at ' + cloud.altitude + 'ft';
        case 'OVC':
            return 'overcast layer at ' + cloud.altitude + 'ft';
        case 'CLR':
            return 'no clouds under 12,000ft';
        default:
            return undefined;
    }
};

const generateSpeechOutputForRawMetarReport = function (rawMetarReportString) {
    let metarReport = parseMETAR(rawMetarReportString);

    let speechOutput = '';
    // wind
    speechOutput += parseWind(metarReport);
    // visibility
    speechOutput += parseVisibility(metarReport);
    // temperature
    speechOutput += parseTemperature(metarReport);

    speechOutput += '<break strength="medium"/>';

    // dew point
    speechOutput += parseDewPoint(metarReport);
    // altimeter
    speechOutput += parseAltimeter(metarReport);
    // clouds
    speechOutput += 'Clouds: ';
    metarReport.clouds.forEach((cloud, i) => {
        speechOutput += parseCloud(cloud) + ', ';
    });
    return speechOutput;
};

const parseWind = function (metarReport) {
    let speechOutput = 'Winds: ';

    let windDirection = metarReport.wind.direction.toString();
    if (windDirection === 'VBR') {
        speechOutput += 'variable wind direction';
    } else {
        speechOutput += pronounceDigits(windDirection);
    }
    return speechOutput + ' at ' + pronounceDigits(metarReport.wind.speed) + ' knots. ';
};

const parseVisibility = function (metarReport) {
    return 'Visibility: ' + pronounceDigits(metarReport.visibility) + ' miles. ';
};

const parseTemperature = function (metarReport) {
    return 'Temperature: ' + pronounceDigits(metarReport.temperature) + '°C. ';
};

const parseDewPoint = function (metarReport) {
    return 'Dew point: ' + pronounceDigits(metarReport.dewpoint) + '°C. ';
};

const pronounceDigits = function (digits) {
    let speechOutput = '<say-as interpret-as="digits">';
    let digitsString = digits.toString();
    for (let i = 0; i < digitsString.length; i++) {
        let d = digitsString.charAt(i);
        if (d === '9') {
            speechOutput += '<sub alias="niner">9</sub>';
            continue;
        }
        speechOutput += d;
    }
    return speechOutput + '</say-as>';
};

const removeDecimalPointOrComma = function (number) {
    return number.toString().replace(/\.|,/, '');
};