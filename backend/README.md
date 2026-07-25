# Store Rating Platform - Backend

A RESTful backend application for a **Store Rating Platform** built using **Node.js**, **Express.js**, **MySQL**, and **Sequelize ORM**.

The platform supports three user roles:

- Admin
- Normal User
- Store Owner

Users can register, log in, browse stores, submit ratings, and update their ratings. Store owners can view dashboard statistics and ratings for their stores. Administrators can manage users and stores.

---

# Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- bcrypt
- express-validator
- Helmet
- CORS
- Morgan

---

# Features

## Authentication

- User Signup
- User Login
- JWT Authentication
- Change Password

---

## Admin

- Dashboard Statistics
- Create User
- Create Store
- View All Users
- View All Stores
- Get User Details
- Update User

---

## User

- View Stores
- Search Stores
- Pagination
- Submit Rating
- Update Rating

---

## Store Owner

- Dashboard
- Average Rating
- Total Ratings
- View Users Who Rated Store
- Search Ratings
- Pagination

---

# Folder Structure

```
src/
│
├── config/
├── constants/
├── controllers/
├── middleware/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── validators/
└── server.js
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create a `.env` file from `.env.example`

Run the project

```bash
npm run dev
```

---

# Environment Variables

Example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=store_rating_platform
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

---

# API Modules

## Authentication

- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/change-password

---

## Admin

- GET /api/admin/dashboard
- POST /api/admin/users
- POST /api/admin/stores
- GET /api/admin/users
- GET /api/admin/users/:id
- PUT /api/admin/users/:id
- GET /api/admin/stores

---

## Stores

- GET /api/stores

---

## Ratings

- POST /api/ratings

---

## Store Owner

- GET /api/owner/dashboard
- GET /api/owner/ratings

---

# Security

- JWT Authentication
- Role-based Authorization
- Password Hashing
- Helmet
- CORS
- Request Validation

---

# Future Improvements

- Docker Support
- Swagger API Documentation
- Unit Testing
- Refresh Tokens
- Forgot Password
- Email Verification

---

# Author

Kanishka Ramesh Deogade