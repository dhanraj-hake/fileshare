# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and POM files
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Download all dependencies
RUN ./mvnw dependency:resolve

# Copy the project source code into the container
COPY src ./src

# Package the application into a JAR file
RUN ./mvnw package -DskipTests

# Expose the port on which the app will run
EXPOSE 8080

# Command to run the JAR file
CMD ["java", "-jar", "target/fileshare-0.0.1-SNAPSHOT.jar"]
