const express = require('express');
const {
      getAllCourse,
      getCourse,
      createCourse,
      updateCourseData,
      deleteCourse,
      getAllLecturesCourse
} = require('../controllers/courseController');

// Not use auth to test routes
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router()


router.route('/')
      .get(getAllCourse)
      .post(createCourse);

router.route('/:id')
      .get(getCourse)
      .patch(updateCourseData)
      .delete(deleteCourse);

router.route('/lectures/:id')
      .get(getAllLecturesCourse)

module.exports = router;