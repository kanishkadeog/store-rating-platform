
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

---

# 🔎 Search, Pagination & Sorting

The application uses server-side data handling for scalable listings.

### Search

Supported listing searches include relevant fields such as:

- Store name
- Address
- Email
- User information

### Pagination

Large datasets are divided into pages to avoid loading unnecessary records at once.

Example:
```
Page 1 → Records 1–5
Page 2 → Records 6–10
Page 3 → Records 11–15
```

### Sorting

Tables support ascending and descending sorting for important fields.

Example:
```
Name ↑
Name ↓

Email ↑
Email ↓

Rating ↑
Rating ↓
```
Sorting is handled through API query parameters and database-level ordering rather than sorting the complete dataset only on the frontend.

---

# 🛡️ Form Validation

The application validates user input before processing requests.

Name:
```
Minimum: 20 characters
Maximum: 60 characters
```

Address:
```
Maximum: 400 characters
```

Password:
```
Length: 8–16 characters
At least one uppercase character
At least one special character
```

Email:
```
Standard email format validation.
```

Rating:
```
Minimum: 1
Maximum: 5
```
---

# 🏗️ System Architecture

The backend follows a layered architecture.
```
                    Client
                      │
                      ▼
                  React.js
                      │
                      ▼
                  REST API
                      │
                      ▼
                 Express.js
                      │
                      ▼
                   Routes
                      │
                      ▼
                 Middleware
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
 Authentication              Validation
 Authorization
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
       MySQL
```
This architecture separates responsibilities and makes the backend easier to maintain, test, and extend.

---

# 🧱 Backend Architecture

The backend follows a layered architecture:

```
Routes
   ↓
Middleware
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Models
   ↓
Sequelize
   ↓
MySQL
```
### Routes

Responsible for defining API endpoints.

### Middleware

Responsible for:

- Authentication
- Authorization
- Validation
- Security middleware

### Controllers

Handle HTTP requests and responses.

### Services

Contain application/business logic.

### Repositories

Handle database operations.

### Models

Define Sequelize database models and relationships.

### Validators

Validate incoming API requests.

### Utils

Contain reusable helper functionality.

### Constants

Contain application constants such as user roles.

### Config

Contains database and environment configuration.

---

# 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- JavaScript
- Material UI
- React Router
- Axios
- React Hook Form
- React Toastify

### Backend
- Node.js
- Express.js
- JavaScript
- REST API
  
### Database
- MySQL
- Sequelize ORM

### Authentication & Security
- JWT
- bcrypt
- Helmet
- CORS
- Cookie Parser

### Validation
- express-validator

### Development Tools
- Git
- GitHub
- Postman
- Nodemon
- VS Code

### Deployment
- Vercel
- Render
  
---

# 📂 Project Structure
```
store-rating-platform/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```
---

# 🔌 REST API

Base URL:
```
https://store-rating-platform-e2h6.onrender.com/api
```

### Authentication APIs
Signup:
```
POST /auth/signup
```
Login:
```
POST /auth/login
```
Change Password:
```
POST /auth/change-password
```

### Admin APIs
Dashboard:
```
GET /admin/dashboard
```
Create User:
```
POST /admin/users
```
Get Users:
```
GET /admin/users
```
Get User:
```
GET /admin/users/:id
```
Update User:
```
PUT /admin/users/:id
```
Create Store:
```
POST /admin/stores
```
Get Stores:
```
GET /admin/stores
```
### User APIs
Get Stores:
```
GET /user/stores
```
Supports query parameters such as:
```
?page=1
&limit=5
&search=mart
&sortBy=name
&sortOrder=asc
```
Get My Ratings:
```
GET /ratings/my
```
Create Rating:
```
POST /ratings
```
Update Rating:
```
PUT /ratings/:storeId
```

### Store Owner APIs
Owner Dashboard:
```
GET /owner/dashboard
```
Owner Ratings:
```
GET /owner/ratings
```
Health Check:
```
GET /health
```

Example response:
```
{
  "success": true,
  "message": "API Running"
}
```
---

# 🗄️ Database Design

The application uses MySQL with Sequelize ORM.

The database is organized around the main entities:
```
Users
   │
   ├───────────────┐
   │               │
   ▼               ▼
Stores          Ratings
   │               │
   └───────┬───────┘
           │
           ▼
        Rating
```
Main relationships
- A user can submit multiple ratings.
- A store can receive multiple ratings.
- A user can rate a particular store only once.
- A store can have an assigned store owner.
- Ratings belong to both a user and a store.

---

# 🔐 Security Implementation

Security measures implemented include:

JWT Authentication

Protected endpoints require a valid JWT.

Authorization: Bearer <token>
Role-Based Authorization

API access is restricted according to role.

ADMIN
USER
OWNER
Password Security

Passwords are hashed using bcrypt rather than being stored in plain text.

Helmet

HTTP security headers are configured using Helmet.

CORS

Cross-origin requests are controlled through CORS configuration.

Input Validation

Incoming requests are validated before reaching business logic.



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
