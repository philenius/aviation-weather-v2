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
  sudo docker run -it -v /home/phil/workspace/chatBots/alexaSkills/aviation-weather/:/skill alexa
  ```
* Install all dependencies:
  ```bash
  npm install
  ```
* Run Bespoken proxy and copy the public Bespoken URL:
  ```bash
  DEV=true bst proxy lambda index.js
  ```
* Set the Bespoken URL as the endpoint of your Alexa skill on the [Amazon Developer Portal](https://developer.amazon.com/alexa/console/ask).

## Deployment

```bash
sudo docker run -it \
-v ~/.ask:/home/node/.ask \
-v ~/.aws:/home/node/.aws \
-v /home/phil/workspace/chatBots/alexaSkills/aviation-weather:/home/node/app \
martindsouza/amazon-ask-cli bash
```

**Don't forget to set the `timeout` of the AWS Lambda function to 7s because the METAR API might take some time to return a HTTP response.**