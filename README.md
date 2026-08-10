
# ⭐ Store Rating Platform

A production-ready full-stack **Store Rating Platform** built with **React.js, Node.js, Express.js, MySQL, and Sequelize ORM**.

The application allows users to discover registered stores, submit ratings from **1 to 5 stars**, and update their ratings. It provides dedicated role-based dashboards for **System Administrators, Normal Users, and Store Owners**.

The project follows a layered backend architecture with secure JWT authentication, role-based authorization, request validation, pagination, searching, sorting, rating management, and production deployment.


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

The Store Rating Platform is a role-based web application designed to provide a centralized platform where users can:

- Browse registered stores
- Search stores
- View store ratings
- Submit ratings
- Modify previously submitted ratings

The system also provides administrative and store-owner functionality.

### User Roles

The application supports three roles:

1. **System Administrator**
2. **Normal User**
3. **Store Owner**

All roles use the same authentication system, while authorization determines which features are available after login.

---

# ✨ Core Features

## 🔐 Authentication & Authorization

- User registration
- User login
- Single login system for all roles
- JWT-based authentication
- Protected routes
- Role-based authorization
- Password hashing using bcrypt
- Change password functionality
- Automatic JWT attachment through Axios interceptor
- Invalid/expired token handling
- Logout functionality

---

# 👨‍💼 System Administrator

Administrators have complete management access to the platform.

### Dashboard

The admin dashboard provides:

- Total number of users
- Total number of stores
- Total number of submitted ratings

### User Management

Administrators can:

- Create normal users
- Create store owners
- Create administrators
- View users
- View individual user details
- Update user information
- View user roles
- Search/filter users

### Store Management

Administrators can:

- Create stores
- View all stores
- View store details
- Assign store owners
- View store ratings
- Monitor average ratings

### Listing Features

Administrative listings support:

- Search
- Pagination
- Ascending sorting
- Descending sorting
- Key-field filtering

---

# 👤 Normal User

Normal users can register and interact with stores.

### Registration

Users can register using:

- Name
- Email
- Address
- Password

### Store Discovery

Users can:

- View all registered stores
- Search stores
- Search by store name/address
- Navigate through paginated results
- View overall store rating

### Rating

Users can:

- Submit a rating from 1–5
- View their submitted rating
- Update an existing rating
- View their rating history

### User Dashboard

The dashboard provides summary statistics:

- Stores Available
- Stores I Rated
- My Average Rating

---

# 🏪 Store Owner

Store owners receive a dedicated dashboard for monitoring their store.

### Dashboard

Owners can view:

- Store name
- Store email
- Store address
- Average store rating
- Total ratings

### Ratings

Store owners can view:

- User name
- User email
- Submitted rating
- Rating date

Ratings support:

- Search
- Pagination
- Ascending sorting
- Descending sorting

---

# ⭐ Rating System

Ratings are restricted to:

```text
1 ⭐
2 ⭐
3 ⭐
4 ⭐
5 ⭐
```
A normal user can submit only one rating per store.

If a rating already exists, the user can update it.



------------------------------------------
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

--- 

## 🛠️ Technology Stack
### Backend
Node.js
Express.js
JavaScript
### Database
MySQL
Sequelize ORM
### Authentication
JWT
bcrypt
### Validation
express-validator
### Security
Helmet
CORS
JWT authorization
### Middleware / Utilities
Morgan
Compression
Cookie Parser
### Development
Nodemon
Postman
Git
GitHub

## Architecture Responsibilities

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
