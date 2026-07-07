# BookShelf Manager

![CI](https://github.com/<your-username>/BookShelf/actions/workflows/ci.yml/badge.svg)

A full-stack book management application built with **Spring Boot 3**, **MySQL**, and **React 18**.

## Features

- Personal library management (add, edit, delete books)
- Reading progress tracking (Wishlist → Reading → Completed)
- Multi-currency price tracking
- Smart search & filter with pagination
- User authentication (Spring Security)
- RESTful API with OpenAPI/Swagger docs
- Dockerized for easy deployment

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Backend   | Spring Boot 3.2, Spring Data JPA, Spring Security |
| Database  | H2 (dev), MySQL 8 (prod)            |
| Frontend  | React 18, Tailwind CSS, Vite        |
| Docs      | SpringDoc OpenAPI (Swagger UI)      |
| CI/CD     | GitHub Actions                      |
| Container | Docker, Docker Compose              |

## Quick Start

### Option A — Docker Compose (recommended)
```bash
cp .env.example .env   # fill in your values
docker-compose up --build
```
App: http://localhost:8080 | Swagger: http://localhost:8080/swagger-ui.html

### Option B — Local Dev

**Backend**
```bash
# Uses H2 in-memory DB by default — no MySQL needed for dev
mvn spring-boot:run
```

**Frontend**
```bash
npm install
npm run dev   # http://localhost:5173
```

## Environment Variables

See `.env.example` for all required variables. Never commit `.env`.

## API

Base URL: `/api/v1/books`

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/`              | List books (paginated)   |
| GET    | `/{id}`          | Get book by ID           |
| POST   | `/`              | Create book              |
| PUT    | `/{id}`          | Update book              |
| DELETE | `/{id}`          | Delete book              |
| GET    | `/stats`         | Get counts by status     |

Query params: `search`, `status`, `page`, `size`, `sortBy`, `sortDir`

Interactive docs: http://localhost:8080/swagger-ui.html

## Running Tests

```bash
mvn test
```

## Default Login
- Username: `admin`
- Password: `admin123` (override via `ADMIN_PASSWORD` env var)
