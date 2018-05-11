'use strict';

const assert = require('assert');
const generateSpeechOutputAndCardForRawMetarReport = require('../app/common/alexaOutputMetarReport');

describe('generateSpeechOutputAndCardForRawMetarReport', () => {
    
    it('should generate a valid speech output and card', () => {
        let { speechOutput, card } = generateSpeechOutputAndCardForRawMetarReport(
            'EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006'
        );
        assert.equal('Winds: <say-as interpret-as="digits">270</say-as> at <say-as interpret-as="digits">6</say-as> knots. Visibility: <say-as interpret-as="digits"><sub alias="niner">9</sub><sub alias="niner">9</sub><sub alias="niner">9</sub><sub alias="niner">9</sub></say-as> miles. Temperature: <say-as interpret-as="digits">13</say-as>°C. <break strength="medium"/>Dew point: <say-as interpret-as="digits">12</say-as>°C. Altimeter: <say-as interpret-as="digits">1006</say-as> hectopascals. Clouds: few clouds at 1200ft, scattered layer at 1500ft and broken layer at 6000ft', speechOutput);
        assert.equal('METAR Report for EFJY', card.title);
        assert.equal('Winds: 270° at 6 kn\nVisibility: 9999 miles\nTemperature: 13 °C\nDew point: 12 °C\nAltimeter: 1006 Hpa\nClouds: few clouds at 1200ft, scattered layer at 1500ft and broken layer at 6000ft', card.content);
    });
    
    it('should generate a valid speech output and card with cumunolimbus', () => {
        let { speechOutput, card } = generateSpeechOutputAndCardForRawMetarReport(
            'EFJY 201050Z AUTO 16007KT 9999 -SHRA OVC060CB 15/09 Q1017'
        );
        assert.equal('Winds: <say-as interpret-as="digits">160</say-as> at <say-as interpret-as="digits">7</say-as> knots. Visibility: <say-as interpret-as="digits"><sub alias="niner">9</sub><sub alias="niner">9</sub><sub alias="niner">9</sub><sub alias="niner">9</sub></say-as> miles. Temperature: <say-as interpret-as="digits">15</say-as>°C. <break strength="medium"/>Dew point: <say-as interpret-as="digits"><sub alias="niner">9</sub></say-as>°C. Altimeter: <say-as interpret-as="digits">1017</say-as> hectopascals. Clouds: overcast layer at 6000ft with cumulonimbus', speechOutput);
        assert.equal('METAR Report for EFJY', card.title);
        assert.equal('Winds: 160° at 7 kn\nVisibility: 9999 miles\nTemperature: 15 °C\nDew point: 9 °C\nAltimeter: 1017 Hpa\nClouds: overcast layer at 6000ft with cumulonimbus', card.content);
    });
    
    it('should generate a valid speech output and card', () => {
        let { speechOutput, card } = generateSpeechOutputAndCardForRawMetarReport(
            'KSAC 291953Z 01006KT 10SM SCT042 BKN050 BKN060 20/07 A3005 RMK AO2 SLP176 T02000072 $'
        );
        assert.equal('Winds: <say-as interpret-as="digits">10</say-as> at <say-as interpret-as="digits">6</say-as> knots. Visibility: <say-as interpret-as="digits">10</say-as> miles. Temperature: <say-as interpret-as="digits">20</say-as>°C. <break strength="medium"/>Dew point: <say-as interpret-as="digits">7</say-as>°C. Altimeter: <say-as interpret-as="unit"><say-as interpret-as="digits">3005</say-as> inHg</say-as>. Clouds: scattered layer at 4200ft, broken layer at 5000ft and broken layer at 6000ft', speechOutput);
        assert.equal('METAR Report for KSAC', card.title);
        assert.equal('Winds: 10° at 6 kn\nVisibility: 10 miles\nTemperature: 20 °C\nDew point: 7 °C\nAltimeter: 3005 inHg\nClouds: scattered layer at 4200ft, broken layer at 5000ft and broken layer at 6000ft', card.content);
    });

});
