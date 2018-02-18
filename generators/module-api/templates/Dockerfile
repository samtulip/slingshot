FROM openjdk
RUN mkdir -p /opt/application/
COPY /maven/*.jar /opt/application/application.jar
WORKDIR /opt/application/
CMD java -jar application.jar
