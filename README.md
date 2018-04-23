# README

## Features
* [ ] Help
* [x] Reprompts
* [x] Exception handling for incorrrect ICAO codes
* [x] Exception handling for unreachable API
* [ ] TFA reports
* [x] METAR reports
* [ ] Fix speech output of METAR report (unit for wind)
* [ ] Implement custom speech output (not using the API anymore)
* [ ] Remember name of user
* [ ] Store ICAO code during session
* [ ] ICAO code pronunciation magic
* [ ] Let user ask for specific details of METAR / TFA report
* [ ] Let user store his favorite airport

## VUI
* **Alexa**, open aviation weather. _..._  
  Tell me the metar report for kilo sierra alpha charlie.
* **Alexa**, ask aviation weather for the metar report.
* **Alexa**, ask aviation weather for the metar report for kilo sierra alpha charlie.
* **Alexa**, ask aviation weather for the metar report for alpha alpha alpha alpha.

## Development
* Run: 
  ```bash
  sudo docker run -it -v /home/phil/workspace/ChatBots/AlexaSkills/aviation-weather/:/aviation-weather alexa
  cd aviation-weather/
  bst proxy lambda index.js
  ```