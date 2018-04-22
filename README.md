# README

* Run: 
  ```bash
  sudo docker run -it -v /home/phil/workspace/ChatBots/AlexaSkills/aviation-weather/:/aviation-weather alexa
  cd aviation-weather/
  bst proxy lambda index.js
  ```
* Test phrases:
  * Tell me the metar report for kilo sierra alpha charlie.