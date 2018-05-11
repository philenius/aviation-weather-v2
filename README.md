# README

## Features
* [ ] Help
* [x] Reprompts
* [x] Exception handling for incorrrect ICAO codes
* [x] Exception handling for unreachable API
* [ ] TFA reports
* [x] METAR reports
* [x] Fix speech output of METAR report (unit for wind)
* [x] Implement custom speech output (not using the API anymore)
* [x] Remember name of user
* [x] Store ICAO code during session
* [ ] ICAO code pronunciation magic
* [ ] Let user ask for specific details of METAR / TFA report
* [ ] Let user store his favorite airport

## VUI
* **Alexa**, open aviation weather. _..._  
  Tell me the metar report for kilo sierra alpha charlie.
* **Alexa**, open aviation weather. _..._  
  Tell me the metar report.
* **Alexa**, ask aviation weather for the metar report.
* **Alexa**, ask aviation weather for the metar report for kilo sierra alpha charlie.
* **Alexa**, ask aviation weather for the metar report for alpha alpha alpha alpha.

## Development
* Run: 
  ```bash
  sudo docker run -it -v /home/phil/workspace/ChatBots/AlexaSkills/aviation-weather/:/skill alexa
  bst proxy lambda index.js
  ```