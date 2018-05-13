'use strict';

const https = require('https');
const generateSpeechOutputAndCardForRawMetarReport = require('./alexaOutputMetarReport');

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
                                console.error(`ICAO code ${icaoCode} not found`);
                                reject(new Error('ICAO code not found'));
                                return;
                            }
                        } catch (e) {
                        }
                        console.error(`general error calling API; got http response ${res.statusCode}`);
                        reject(new Error('general error calling API'));
                        return;
                    }
                    let metarReport = JSON.parse(body);
                    resolve(
                        generateSpeechOutputAndCardForRawMetarReport(metarReport['Raw-Report'])
                    );
                });
                res.on('error', (error) => {
                    reject(error);
                });
            });
        });
    },
};
