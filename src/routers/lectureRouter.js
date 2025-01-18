const express = require('express');
const {
  getAllLectures,
  getLecture,
  createLecture,
  deleteLecture
} = require('../controllers/lectureController');

// Not use auth to test routes
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router()

router.route('/')
  .get(getAllLectures)
  .post(createLecture);

router.route('/:id')
  .get(getLecture)
  .patch()
  .delete(deleteLecture);


module.exports = router;