require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const errorHandler = require('./middlewares/error-handler');
const courseRouter = require('./routers/courseRouter');
const lecturesRouter = require('./routers/lectureRouter');
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRourer');
const assignmentRouter = require('./routers/assignmentRouter');
const authRouter = require('./routers/authRouter');
const BadError = require('./errors/bad-error');

// Connect to the database
connectDB();

// Create Express app
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('welcome');
});

// API routes
app.use('/api/v1/lectures/', lecturesRouter);
app.use('/api/v1/courses/', courseRouter)
app.use('/api/v1/users/', userRouter);

app.use('/api/v1/assignments/', assignmentRouter);
app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/admins/', adminRouter)
app.all('*', (req, res, next) => {
  next(new BadError(`Can't find this route: ${req.originalUrl}`))
});

// Custom error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || '5000';
const HOST = process.env.HOST || '127.0.0.1';

try {
  mongoose.connection.once('open', () => {
      app.listen(PORT, HOST, () => {
          console.log(`Server is running on http://${HOST}:${PORT}`);
      });
      
  });
} catch (err) {
  console.log(err);
}

process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection: ${err}`);
  process.exit(1);
});