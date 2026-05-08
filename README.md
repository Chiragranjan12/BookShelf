#  Book Management System

A full-stack book management application built with Spring Boot, MySQL, and React.

## Features

- Personal library management
- Reading progress tracking
- Multi-currency support
- User authentication
- RESTful API
- Responsive web interface

## Tech Stack

### Backend
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- MySQL Database
- Thymeleaf
- Maven

### Frontend
- React 18
- Tailwind CSS
- Lucide React Icons

## Setup Instructions

### Prerequisites
- Java 17+
- Maven 3.6+
- MySQL 8.0+
- Node.js 16+

### Database Setup
1. Install MySQL and create database:
```sql
CREATE DATABASE bookmanager_db;
```

2. Update `application.properties` with your MySQL credentials

### Backend Setup
1. Navigate to project root
2. Run: `mvn spring-boot:run`
3. Access at: http://localhost:8080

### Frontend Setup
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Access at: http://localhost:5173

## Default Login
- Username: admin
- Password: admin123

## API Endpoints

### Books
- GET `/api/books` - Get all books
- POST `/api/books` - Create book
- PUT `/api/books/{id}` - Update book
- DELETE `/api/books/{id}` - Delete book
- GET `/api/books/stats` - Get statistics

## Database Schema

### Books Table
- id (BIGINT, PRIMARY KEY)
- title (VARCHAR)
- author (VARCHAR)
- status (VARCHAR)
- source (VARCHAR)
- price (DECIMAL)
- currency (VARCHAR)
- borrowed_from (VARCHAR)
- notes (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
 