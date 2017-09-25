FROM node:8.4.0

RUN set -x \
    && apt-get update \
    && apt-get install -y build-essential git --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ENV APP_DIR /usr/src/app

RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

ADD package.json ./
RUN yarn

ADD . ${APP_DIR}
