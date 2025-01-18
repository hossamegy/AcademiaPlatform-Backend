# AcademiaPlatform-Backend

Welcome to the **AcademiaPlatform-Backend** repository! This is the backend for an educational platform that provides APIs for managing users, courses, lectures, assignments, and more. Built with **Node.js**, **Express**, and **MongoDB**, this project is designed to be scalable, modular, and easy to maintain.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Error Handling](#error-handling)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- **User Management**: Sign up, log in, and manage user profiles (students, admins, and instructors).
- **Course Management**: Create, update, delete, and retrieve courses.
- **Lecture Management**: Add lectures to courses and manage lecture details.
- **Assignment Management**: Create assignments, submit solutions, and grade submissions.
- **Authentication and Authorization**: JWT-based authentication and role-based access control.
- **Error Handling**: Custom error handling for development and production environments.
- **Validation**: Request validation using `express-validator`.

---

## Technologies Used

- **Node.js**: Runtime environment.
- **Express**: Web framework for building APIs.
- **MongoDB**: Database for storing application data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT (JSON Web Tokens)**: For authentication and authorization.
- **Bcrypt**: For password hashing.
- **Dotenv**: For managing environment variables.
- **Express Validator**: For request validation.

---

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/AcademiaPlatform-Backend.git
   cd AcademiaPlatform-Backend

 2. **Install dependencies:
   ```bash
    npm install
   ```

  3. **Set up environment variables:
    Create a .env file in the root directory and add the following variables:
    ```bash
    MONGODB_URL=url
    PORT=3000
    HOST=127.0.0.1
    MODE_ENV=development
    JWT_SECRET_KEY=your_jwt_secret_key
    JWT_EXPIRED_TIME=30d
    ```

  4. **Start the server:
    ```bash
    npm start
    ```
  5. **Access the API:
    The API will be running at http://127.0.0.1:3000.

## Environment Variables
  - Variable Name	Description	Default Value
  - MONGODB_URL	MongoDB connection URL
  - PORT	Port for the server to run on	3000
  - HOST	Host for the server to run on	127.0.0.1
  - MODE_ENV	Environment mode (development/production)	development
  - JWT_SECRET_KEY	Secret key for JWT token generation	-
  - JWT_EXPIRED_TIME	Expiration time for JWT tokens	30d
 
## API Endpoints
Authentication

   - POST /api/v1/auth/signup: Register a new user.

   - POST /api/v1/auth/login: Log in and get a JWT token.

Users

   - GET /api/v1/users: Get all users.

   - GET /api/v1/users/:id : Get a specific user by ID.

   - POST /api/v1/users: Create a new user.

   - PUT /api/v1/users/:id : Update a user by ID.

   - DELETE /api/v1/users/:id : Delete a user by ID.

Courses

   - GET /api/v1/courses: Get all courses.

   - GET /api/v1/courses/:id : Get a specific course by ID.

   - POST /api/v1/courses: Create a new course.

   - PATCH /api/v1/courses/:id : Update a course by ID.

   - DELETE /api/v1/courses/:id : Delete a course by ID.

Lectures

   - GET /api/v1/lectures: Get all lectures.

   - GET /api/v1/lectures/:id : Get a specific lecture by ID.

   - POST /api/v1/lectures: Create a new lecture.

   - DELETE /api/v1/lectures/:id : Delete a lecture by ID.

Assignments

   - GET /api/v1/assignments: Get all assignments.

   - GET /api/v1/assignments/:id : Get a specific assignment by ID.

   - POST /api/v1/assignments: Create a new assignment.

   - PUT /api/v1/assignments/:id : Update an assignment by ID.

   - DELETE /api/v1/assignments/:id : Delete an assignment by ID.

Admins

   - GET /api/v1/admins: Get all admins.

   - GET /api/v1/admins/:id : Get a specific admin by ID.

   - POST /api/v1/admins: Create a new admin.

   - PUT /api/v1/admins/:id : Update an admin by ID.

   - DELETE /api/v1/admins/:id : Delete an admin by ID.

Error Handling

The API uses custom error handling middleware to provide meaningful error messages. Errors are categorized into:

   - BadRequestError: For invalid requests (400).

   - UnauthorizedError: For unauthorized access (401).

   - NotFoundError: For resources not found (404).

   - InternalServerError: For server-side errors (500).

Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

   - Fork the repository.

   - Create a new branch for your feature or bugfix.

   - Commit your changes.

   - Submit a pull request.
