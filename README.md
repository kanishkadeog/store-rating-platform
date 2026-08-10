
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
Main relationships:
- A user can submit multiple ratings.
- A store can receive multiple ratings.
- A user can rate a particular store only once.
- A store can have an assigned store owner.
- Ratings belong to both a user and a store.

---

# 🔐 Security Implementation

Security measures implemented include:

### JWT Authentication
Protected endpoints require a valid JWT.
```
Authorization: Bearer <token>
```

### Role-Based Authorization
API access is restricted according to role.
```
ADMIN
USER
OWNER
```

### Password Security
Passwords are hashed using bcrypt rather than being stored in plain text.

### Helmet

HTTP security headers are configured using Helmet.

### CORS

Cross-origin requests are controlled through CORS configuration.

### Input Validation

Incoming requests are validated before reaching business logic.

---

# ⚡ Frontend Architecture

The React application follows a component-based architecture.
```
Pages
  │
  ├── Admin
  ├── User
  └── Owner
        │
        ▼
    Components
        │
        ▼
     Services
        │
        ▼
       Axios
        │
        ▼
    REST API
```
### Authentication Context
Authentication state is managed through React Context.

### Axios Interceptor
JWT tokens are automatically attached to protected API requests.

### Reusable Components
The application uses reusable components for:
- Tables
- Search
- Pagination
- Rating dialogs
- Navigation
- Dashboards
- Forms

---

# 📱 Responsive UI

The frontend is built using Material UI and supports responsive layouts across different screen sizes.

The dashboards use:

- Responsive grids
- Responsive tables
- Compact spacing
- Pagination controls
- Responsive forms
- Reusable Material UI components

---

# 🧪 API Testing

API endpoints were tested using Postman.

Testing includes:

- Signup
- Login
- JWT authentication
- Role authorization
- User APIs
- Admin APIs
- Owner APIs
- Rating creation
- Rating update
- Validation errors
- Unauthorized requests
- Invalid/expired tokens
- Pagination
- Search

---

# 🚀 Local Development

### 1. Clone Repository
```
git clone <YOUR_GITHUB_REPOSITORY_URL>
```
```
cd store-rating-platform
```
### 2. Backend Setup
```
cd backend
```
Install dependencies:
```
npm install
```
Create:
```
.env
```
Example:
```
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=store_rating_platform
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

Start development server:
```
npm run dev
``` 
Backend:
```
http://localhost:5000
```
---

# 💻 Frontend Setup

Open another terminal:
```
cd frontend
```
Install dependencies:
```
npm install
```
Start Vite:
```
npm run dev
```
Frontend:
```
http://localhost:5173
```

---

# 🏭 Production Build

To create the production frontend build:
```
npm run build
```
The production files are generated inside:
```
frontend/dist/
```

---

# ☁️ Deployment

### Frontend

The React/Vite frontend is deployed using:

Vercel

### Backend

The Express.js REST API is deployed using:

Render

### Database

The application uses MySQL as its relational database.

Railway.com 

---

# 📊 Engineering Practices

The project demonstrates several software engineering practices:

- Layered backend architecture
- Repository pattern
- Service layer
- RESTful API design
- JWT authentication
- Role-based authorization
- Input validation
- Password hashing
- Reusable React components
- API service abstraction
- Axios interceptors
- Server-side pagination
- Search functionality
- Sorting
- Error handling middleware
- Environment variables
- Production deployment
- Separation of frontend and backend concerns

---

# 🔮 Future Improvements

Potential future enhancements include:

- Swagger/OpenAPI documentation
- Automated unit and integration tests
- Docker support
- CI/CD pipeline
- Refresh token mechanism
- Forgot password workflow
- Email verification
- Advanced analytics
- Store-owner multiple-store support
- Improved caching
- Database indexing optimization

---

👨‍💻 Author
Kanishka Ramesh Deogade

Full Stack Developer

Technologies:
```
JavaScript
React.js
Node.js
Express.js
MySQL
MongoDB
REST APIs
JWT
Git
GitHub
Project
```

⭐ Store Rating Platform

Built as a full-stack role-based web application demonstrating authentication, authorization, REST APIs, relational database design, frontend development, and production deployment.

⭐ Project Highlights
```
🔐 Secure Authentication
👥 Role-Based Access Control
👨‍💼 Admin Management
👤 User Rating System
🏪 Store Owner Dashboard
⭐ 1–5 Star Rating System
🔎 Search
📄 Server-Side Pagination
↕️ Ascending / Descending Sorting
🛡️ Input Validation
🗄️ MySQL + Sequelize
⚡ REST APIs
📱 Responsive React UI
☁️ Production Deployment
```


