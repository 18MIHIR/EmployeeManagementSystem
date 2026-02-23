# Employee Management System with JWT Authentication

A secure full-stack Employee Management System built using Spring Boot, MySQL, React, and Tailwind CSS. This application provides complete employee CRUD operations with JWT-based authentication and role-based authorization.

---

## Features

### Employee Management
- Create, view, update, and delete employee records
- Store employee details including:
  - Name
  - Email
  - Phone
  - Salary
  - Department
  - Position
- Persistent storage using MySQL database
- Input validation for secure and clean data

### Authentication & Authorization
- JWT (JSON Web Token) based authentication
- Secure login and registration system
- Password encryption using BCrypt
- Role-based access control:
  - ADMIN
  - MANAGER
  - USER

### User Registration & Login
- Secure user registration with validation
- Login system with JWT token generation
- Persistent login using localStorage
- Auto authentication using token

### Secure API
- Protected REST API endpoints
- Role-based access restrictions
- Axios interceptor for automatic token attachment

### Search and Filtering
- Full-text search across employee fields
- Filter employees by:
  - Name
  - Email
  - Phone
- Real-time search results

### Responsive UI
- Built using React and Tailwind CSS
- Clean and modern interface
- Form validation and user feedback
- Role-based navigation display

---

## Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- MySQL
- JPA / Hibernate

### Frontend
- React.js
- Tailwind CSS
- Axios

### Database
- MySQL

---

## Security Features

- JWT Token Authentication
- Password encryption using BCrypt
- Role-based Authorization
- Secure API endpoints

---

## API Features

- RESTful API design
- Secure endpoints
- CRUD operations
- Authentication APIs

---

## Project Architecture

Frontend (React)
↓
Axios HTTP Requests
↓
Spring Boot REST API
↓
Spring Security + JWT
↓
Service Layer
↓
Repository Layer (JPA)
↓
MySQL Database

---

## Future Improvements

- Pagination support
- Refresh token implementation
- Email verification
- Docker deployment
- Cloud deployment (AWS)

---

## Author

Mihir Singh Chouhan

BTech Computer Science Student  
Java Full Stack Developer
