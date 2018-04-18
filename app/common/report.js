'use strict';

const https = require('https');

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
                    resolve(JSON.parse(body).Speech);
                });
                res.on('error', (error) => {
                    reject(error);
                });
            });
        });
    },

};