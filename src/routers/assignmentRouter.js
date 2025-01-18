const express = require('express');
const {
      getAllAssignments,
      getAssignment,
      createAssignment,
      updateAssignmentData,
      deleteAssignment,
      getStudentAssignment
} = require('../controllers/assignmentController');

// Not use auth to test routes
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
      .get(getAllAssignments)
      .post(createAssignment)


router.route('/:id')
      .get(getAssignment)

      .put(updateAssignmentData)
      .delete(deleteAssignment);

router.route('/student/:id').get(getStudentAssignment);

module.exports = router;