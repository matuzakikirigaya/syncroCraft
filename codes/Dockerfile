FROM groovy:2.4.11-jre-alpine AS codegen

USER root

WORKDIR /workdir

FROM node:10.14.0-alpine

WORKDIR /workdir

COPY . /workdir

#ENV inu "dog"

RUN cd server && yarn && \
    yarn tsc -p .
# ENTRYPOINT ["/dokoka", "--"]

CMD ["node", "server/dist/server.js"]
