module.exports = {
    "en-US": {
        "translation": {
            'WELCOME': '<p>Welcome to aviation weather.</p> <p>I can tell you about METAR and TFA reports. Please use the NATO alphabet to spell the <say-as interpret-as="characters">ICAO</say-as> code for your desired airport.</p> To ask for the METAR report simply say: <break time="600ms"/> tell me the METAR report for blablabla. <break time="600ms"/> Please keep in mind that this is still a very alpha version. So, how can I help you?',
            'METAR_REPORT_ANSWER': 'Here comes your METAR report for %s <break time="1s"/> %s',
            'METAR_REPORT_ANSWER_REPROMPT': [
                'Can I help you with anything else?',
                'Is there anything else that I can help you with?',
            ],
            'METAR_REPORT_ERROR_ICAO_NOT_FOUND': 'I couldn\'t find any information for the <say-as interpret-as="characters">ICAO</say-as> code <break time="200ms"/> %s. Please make sure that the given airport exists and try again.',
            'METAR_REPORT_ERROR': 'I\'m sorry, something went wrong. I\'m having troubles to process your request. Please come back later.',
            'FAREWELL': [
                '<say-as interpret-as="interjection">all righty</say-as>',
                '<say-as interpret-as="interjection">aloha</say-as>',
                '<say-as interpret-as="interjection">arrivederci</say-as>',
                '<say-as interpret-as="interjection">au revoir</say-as>',
                '<say-as interpret-as="interjection">bon voyage</say-as>',
                '<say-as interpret-as="interjection">cheerio</say-as>',
                '<say-as interpret-as="interjection">cheers</say-as>',
                '<say-as interpret-as="interjection">eureka</say-as>',
                '<say-as interpret-as="interjection">geronimo</say-as>',
                '<say-as interpret-as="interjection">gotcha</say-as>',
                '<say-as interpret-as="interjection">howdy</say-as>',
                '<say-as interpret-as="interjection">okey dokey</say-as>',
                '<say-as interpret-as="interjection">righto</say-as>',
                '<say-as interpret-as="interjection">roger</say-as>',
            ],
            'UNHANDLED': [
                '<say-as interpret-as="interjection">oh boy</say-as>, there was an error. Please come back in a few moments.',
            ]
        }
    },
    "de-DE": {
        "translation": {
        }
    }
}