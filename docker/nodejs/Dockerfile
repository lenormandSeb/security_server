FROM node:latest

COPY ./run.sh /usr/local/bin

COPY nodeProject /srv/nodeProject/current

RUN chmod +x /usr/local/bin/run.sh

# Must be like (index|server).js listenning port
EXPOSE ${port}

RUN sed -i -e 's/\r$//' /usr/local/bin/run.sh

ENTRYPOINT ["run.sh" ]