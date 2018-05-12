# README

## Features
* [ ] Help
* [x] Reprompts
* [x] Exception handling for incorrrect ICAO codes
* [x] Exception handling for unreachable API
* [ ] TAF reports
* [x] METAR reports
* [x] Fix speech output of METAR report (unit for wind)
* [x] Implement custom speech output (not using the API anymore)
* [x] Remember name of user
* [x] Store ICAO code during session
* [ ] ICAO code pronunciation magic
* [ ] Let user ask for specific details of METAR / TAF report
* [ ] Let user store his favorite airport

## VUI (Voice User Interface)
* **Alexa**, open aviation weather. _..._  
  Tell me the metar report for kilo sierra alpha charlie.
* **Alexa**, open aviation weather. _..._  
  Tell me the metar report.
* **Alexa**, ask aviation weather for the metar report.
* **Alexa**, ask aviation weather for the metar report for kilo sierra alpha charlie.

## Development
* Build the Dockerfile included in this repo:
  ```bash
  sudo docker build -t alexa .
  ```
* Instanciate a Docker container: 
  ```bash
  sudo docker run -it -v /home/phil/workspace/ChatBots/AlexaSkills/aviation-weather/:/skill alexa
  ```
* Install all dependencies:
  ```bash
  npm install
  ```
* Run Bespoken proxy and copy the public Bespoken URL:
  ```bash
  DEV=true bst proxy lambda index.js
  ```

## Deployment
* Create a zip file:
  ```bash
  zip -r skill.zip index.js app/ node_modules/
  ```
* Log in to the [AWS Management Console](https://aws.amazon.com/console) and upload the zip file to your AWS Lambda function.
* Copy the ARN of your Lambda function and add it as the skill's endpoint on [https://developer.amazon.com](https://developer.amazon.com).
