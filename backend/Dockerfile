# STAGE 1: Build (Sử dụng Maven để đóng gói file JAR)
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy file cấu hình và tải các dependencies trước để tận dụng cache của Docker
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy mã nguồn và build dự án (Bỏ qua Unit Test để build nhanh hơn)
COPY src ./src
RUN mvn clean package -DskipTests

# STAGE 2: Runtime (Chỉ lấy file JAR đã build để chạy ứng dụng)
# Sử dụng base image nhẹ theo yêu cầu SRS
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy file JAR từ stage build sang stage này
COPY --from=build /app/target/*.jar app.jar

# Mở cổng 8080 cho ứng dụng
EXPOSE 8080

# Chạy ứng dụng Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]