FROM node:9

RUN npm install -g bespoken-tools nodemon

WORKDIR /skill/lambda/custom

ENTRYPOINT ["/bin/bash"]