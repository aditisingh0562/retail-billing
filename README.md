# Retail Billing System - Lite Version

A lightweight, high-performance Retail Billing application built with **Spring Boot 3** and **React**.

## 🚀 Features
- **Modern UI**: Dark-themed, responsive dashboard with glassmorphism effects.
- **Product Catalog**: Manage inventory with real-time stock tracking (12+ sample products).
- **Billing System**: Fast invoice generation with automatic stock reduction.
- **User Management**: 
  - JWT Secured Login & Registration.
  - Profile Page with Contact Details (Address, Phone, Email).
  - dropdown menu for quick access to Account Info and Past Invoices.
- **Invoice History**: View click-to-open past invoices with full itemized breakdowns.
- **In-Memory Database**: Uses H2 database for zero-configuration setup.

## 🛠️ Technology Stack
- **Backend**: Spring Boot 3.2.5, Spring Security (JWT), Spring Data JPA.
- **Frontend**: React (Vite), Axios.
- **Database**: H2 (In-Memory).

## 🏃 Running the Project

### Prerequisites
- Java 17+
- Node.js & npm

### Backend
1. Navigate to `backend/`.
2. Run: `.\mvnw spring-boot:run`
3. Swagger UI: `http://localhost:8080/swagger-ui.html`

### Frontend
1. Navigate to `frontend/`.
2. Run: `npm install` (first time)
3. Run: `npm run dev`
4. Access at: `http://localhost:5173`

## 🔑 Default Credentials
- **Username**: `admin`
- **Password**: `admin123`
*(Or Register your own account on the login screen)*
