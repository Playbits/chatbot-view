FROM node:16.18.0-alpine AS builder

WORKDIR /usr/src/app

# Installing dependencies
COPY ["package.json","yarn.lock", "./"]

RUN if ! [[ -d 'node_modules' ]] ; then yarn install ; fi

COPY . .

# Building app
RUN yarn build

FROM builder AS dev-envs

# Update OS
RUN apk update && apk upgrade && \
    apk add git

RUN addgroup -S docker && \
    adduser -S --shell /bin/bash --ingroup docker vscode

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

EXPOSE 9500

# Running the app
CMD ["yarn", "dev"]
