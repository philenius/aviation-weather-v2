module.exports = {
    "en-US": {
        "translation": {
            'WELCOME_FIRST': '<p><say-as interpret-as="interjection">yoo hoo,</say-as> it looks like we never met before. So, welcome to aviation weather!<break time="500ms"/> You can ask me for METAR and <say-as interpret-as="characters">TAF</say-as> reports.<break time="300ms"/> Please use the NATO phonetic alphabet to spell the <say-as interpret-as="characters">ICAO</say-as> code of your desired airport, so that I can better understand you.<break time="300ms"/> For example, you can say: <break time="500ms"/> tell me the METAR report for Kilo, Sierra, Alpha, Charlie.</p> <p>But first, I gotta tell you that I\'m really excited to talk to you. Can you please tell me your <prosody pitch="medium">first name?</prosody></p>',
            'WELCOME_FIRST_REPROMPT': 'If you don\'t want to tell me your name, simply say no.',
            'WELCOME': 'Welcome to aviation weather. How can I help you?',
            'WELCOME_WITH_NAME': 'Hi %s, welcome to aviation weather. How can I help you?',
            'WELCOME_REPROMPT': '<p>Here\'s what you can do: You can ask me for METAR and <say-as interpret-as="characters">TAF</say-as> reports for any airport using the <say-as interpret-as="characters">ICAO</say-as> code. Simply say: <break time="500ms"/> tell me the METAR report for Kilo, Sierra, Alpha, Charlie. Please use the NATO phonetic alphabet to spell the <say-as interpret-as="characters">ICAO</say-as> code of your desired airport.</p> <p>You can also set or change your name, so that I can greet you each time you open this skill. If you don\'t want me to remember your name anymore, say: <break time="500ms"/> forget my name.</p>',
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