# Use the Alpine-based image for OpenJDK 8
FROM openjdk:8-jdk-alpine

# Metadata indicating an image maintainer.
LABEL maintainer="micaelparadox@gmail.com"

# Specify the JAR_FILE build argument.
ARG JAR_FILE=target/UserProfilingSystem-0.0.1-SNAPSHOT.jar

# Copy the application's jar file to the container image.
COPY ${JAR_FILE} app.jar

# Entry point to start the application.
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
