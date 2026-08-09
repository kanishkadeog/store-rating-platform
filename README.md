
# ⭐ Store Rating Platform

A full-stack role-based **Store Rating Platform** where users can discover stores, submit ratings from 1–5 stars, update their ratings, and view their rating history.

The platform provides dedicated dashboards for **Administrators, Store Owners, and Normal Users**, with secure JWT authentication, role-based authorization, RESTful APIs, MySQL database integration, pagination, search, rating management, and production deployment.

---

## 🚀 Live Demo

### 🌐 Frontend
https://store-rating-platform-delta.vercel.app/

### ⚙️ Backend API
https://store-rating-platform-e2h6.onrender.com

### ❤️ API Health Check
https://store-rating-platform-e2h6.onrender.com/api/health


---

## 📌 Project Overview

The **Store Rating Platform** is designed to solve a simple but practical problem:

> Allow users to discover stores and provide ratings while giving administrators and store owners useful insights into store performance.

The application follows a **role-based architecture** with three different user experiences:

### 👨‍💼 Administrator

Administrators can:

- View dashboard statistics
- Manage users
- Create users
- View stores
- Create stores
- Assign store owners
- View store information
- Monitor average store ratings

### 🏪 Store Owner

Store owners can:

- View their store dashboard
- View average store rating
- View total number of ratings
- View users who rated their store
- View individual ratings
- Search/filter ratings
- Navigate between dashboard and ratings

### 👤 Normal User

Normal users can:

- View available stores
- Search stores
- Navigate through paginated stores
- View average store ratings
- Submit a rating
- Update an existing rating
- View their own ratings
- View rating statistics
- See their average rating

---

# ✨ Key Features

## 🔐 Authentication & Authorization

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Role-based authorization
- Admin role
- Store Owner role
- Normal User role
- Change password functionality
- Automatic JWT attachment using Axios interceptor
- Invalid/expired token handling

---

## 👨‍💼 Admin Dashboard

Admin functionality includes:

- Dashboard overview
- User management
- Store management
- Create user
- Create store
- View store details
- Store owner assignment
- Average store rating display
- Role-based access control

---

## 🏪 Owner Dashboard

Store owners receive a dedicated dashboard containing:

### Store Information

- Store name
- Store email
- Store address

### Rating Statistics

- Average rating
- Total ratings

### Ratings Page

Owners can see:

- User name
- User email
- Rating
- Rating date

---

## 👤 User Dashboard

The normal user dashboard includes:

### Summary Cards

- Stores Available
- Stores I Rated
- My Average Rating

### Store Listing

- Store name
- Email
- Address
- Average rating
- User's rating
- Rate/Update Rating action

### Search

Users can search stores using:

- Store name
- Store email

### Pagination

Store results are displayed using server-side pagination.

### Rating Management

Users can:

```text
Rate Store
    ↓
Submit Rating
    ↓
Rating Saved
    ↓
Update Rating
    ↓
Updated Rating

```
### 🧱 Architecture

The backend follows a layered architecture designed to keep business logic separated from HTTP handling and database operations.

Request
   │
   ▼
Routes
   │
   ▼
Middleware
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
Sequelize ORM
   │
   ▼
MySQL Database

### 🛠️ Technology Stack
## Backend
Node.js
Express.js
JavaScript
## Database
MySQL
Sequelize ORM
## Authentication
JWT
bcrypt
## Validation
express-validator
## Security
Helmet
CORS
JWT authorization
## Middleware / Utilities
Morgan
Compression
Cookie Parser
## Development
Nodemon
Postman
Git
GitHub

### Architecture Responsibilities

Layer	Responsibility
Routes	Define API endpoints
Middleware	Authentication, authorization, validation
Controllers	Handle HTTP requests/responses
Services	Business logic
Repositories	Database operations
Models	Sequelize database models
Validators	Request validation
Utils	Reusable utilities
Constants	Roles and application constants
Config	Database/environment configuration
