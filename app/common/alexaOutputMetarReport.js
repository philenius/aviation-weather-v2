'use strict';

const parseMETAR = require('metar');

module.exports = function (rawMetarReportString) {
    const metarReport = parseMETAR(rawMetarReportString);

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
    let cloudArray = [];
    metarReport.clouds.forEach((cloud, i) => {
        cloudArray.push(parseCloud(cloud));
    });
    speechOutput += 'Clouds: ' + concatArray(cloudArray);

    return { 'speechOutput': speechOutput, 'card': generateCardForMetarReport(metarReport) };
};

const generateCardForMetarReport = function (metarReport) {
    let cardTitle = 'METAR Report for ' + metarReport.station;
    let cardContent = '';

    cardContent += `Winds: ${metarReport.wind.direction}° at ${metarReport.wind.speed} kn\n`;
    cardContent += `Visibility: ${metarReport.visibility} miles\n`;
    cardContent += `Temperature: ${metarReport.temperature} °C\n`;
    cardContent += `Dew point: ${metarReport.dewpoint} °C\n`;
    if (metarReport.altimeterInHpa) {
        cardContent += `Altimeter: ${removeDecimalPointOrComma(metarReport.altimeterInHpa)} Hpa\n`;
    } else {
        cardContent += `Altimeter: ${removeDecimalPointOrComma(metarReport.altimeterInHg)} inHg\n`;
    }
    let cloudArray = [];
    metarReport.clouds.forEach((cloud, i) => {
        cloudArray.push(parseCloud(cloud));
    });
    cardContent += 'Clouds: ' + concatArray(cloudArray);
    return { 'title': cardTitle, 'content': cardContent };
}

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

const parseAltimeter = function (metarReport) {
    let speechOutput = 'Altimeter: ';
    if (metarReport.altimeterInHpa) {
        return speechOutput + pronounceDigits(removeDecimalPointOrComma(metarReport.altimeterInHpa)) + ' hectopascals. ';
    }
    return speechOutput + '<say-as interpret-as="unit">' + pronounceDigits(removeDecimalPointOrComma(metarReport.altimeterInHg)) + ' inHg</say-as>. ';
};

const parseCloud = function (cloud) {
    let description = '';
    switch (cloud.abbreviation) {
        case 'NSC':
            description += 'nil significant cloud';
            break;
        case 'NCD':
            description += 'no clouds detected';
            break;
        case 'CAVOK':
            description += undefined;
            break;
        case 'FEW':
            description += 'few clouds at ' + cloud.altitude + 'ft';
            break;
        case 'SCT':
            description += 'scattered layer at ' + cloud.altitude + 'ft';
            break;
        case 'BKN':
            description += 'broken layer at ' + cloud.altitude + 'ft';
            break;
        case 'OVC':
            description += 'overcast layer at ' + cloud.altitude + 'ft';
            break;
        case 'CLR':
            description += 'no clouds under 12,000ft';
            break;
        default:
            return undefined;
    }
    if (cloud.cumulonimbus) {
        description += ' with cumulonimbus'
    }
    return description;
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

const concatArray = function (myData, penultimateWord = 'and') {
    let result = '';

    myData.forEach(function (element, index, arr) {

        if (index === 0) {
            result = element;
        } else if (index === myData.length - 1) {
            result += ` ${penultimateWord} ${element}`;
        } else {
            result += `, ${element}`;
        }
    });
    return result;
}