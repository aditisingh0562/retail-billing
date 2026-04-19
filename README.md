# Retail Billing System

A professional-grade, high-performance Retail Billing application built with a modern full-stack architecture. I built this system to bridge the gap between complex enterprise features and user-friendly design. By integrating a robust PostgreSQL database with a premium React interface, I created a tool that ensures reliable data persistence and security while remaining snappy and intuitive.

## Key Features
- **Professional Persistence**: Powered by PostgreSQL for reliable, enterprise-grade data management.
- **Secure by Default**: Every action is shielded by modern JWT-based authentication.
- **Human-Centric Design**: A stunning dark-mode interface built for clarity, speed, and visual excellence.
- **Product Catalog**: Manage inventory with real-time stock tracking and search.
- **Billing Engine**: Automated invoice generation with instant stock reduction.
- **Profile Management**: Secure account management with detailed user profiles and invoice history.

##  Technology Stack

### **Frontend (The User Interface)**
* **React (Vite)**: For a fast, snappy single-page application (SPA).
* **Vanilla CSS**: Custom premium dark-mode design for maximum performance.
* **Axios**: Standardized REST API communication.

### **Backend (The Engine)**
* **Spring Boot 3.2.5**: Industry-standard Java framework for robust web apps.
* **Spring Security (JWT)**: Secure authentication and authorization shield.

### **Database & Storage**
* **PostgreSQL 18**: World-class relational database for secure, permanent data storage.
* **Spring Data JPA / Hibernate**: Automatic mapping between Java code and database tables.

---

##  Project Structure

```text
retail-billing-lite/
├── backend/                # Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/retailbilling/
│   │   │   │   ├── config/      # Configuration (Security, CORS, DataInit)
│   │   │   │   ├── controller/  # REST API Endpoints
│   │   │   │   ├── entity/      # JPA Hibernate Entities
│   │   │   │   ├── exception/   # Custom Error Handlers
│   │   │   │   ├── repository/  # Data Access Layer (JPA)
│   │   │   │   ├── security/    # JWT & Filter Logic
│   │   │   │   ├── service/     # Business Logic Layer
│   │   │   │   └── RetailBillingApplication.java
│   │   │   └── resources/       # application.properties & Static Assets
│   │   └── test/                # Unit & Integration Tests
│   └── pom.xml                  # Maven Dependencies
├── frontend/               # React SPA (Vite)
│   ├── src/
│   │   ├── App.jsx              # Main Application Logic & UI
│   │   └── main.jsx             # Entry Point
│   ├── index.html               # Base HTML Template
│   ├── package.json             # NPM Dependencies
│   └── vite.config.js           # Vite Configuration
└── README.md                # Project Documentation
```

---
##  Running the Project

### Prerequisites
- Java 17+
- Node.js & npm
- PostgreSQL 18 (with a database named `retail_billing`)

### 1. Database Setup
1. Create a database named `retail_billing` in pgAdmin.
2. Ensure your credentials match those in `backend/src/main/resources/application.properties`.

### 2. Backend Startup
1. Navigate to the `backend/` folder.
2. Run: `.\mvnw spring-boot:run`
3. API Documentation (Swagger): `http://localhost:8080/swagger-ui.html`

### 3. Frontend Startup
1. Navigate to the `frontend/` folder.
2. Run: `npm run dev`
3. Access the application at: `http://localhost:5173`

---

##  Default Credentials
- **Username**: `admin`
- **Password**: `admin123`
*(Note: You can also register a new account directly on the login screen).*
