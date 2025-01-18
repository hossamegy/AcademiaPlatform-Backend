const express = require('express');
const {
  getAdminValidator,
  createAdminValidator,
  updateAdminValidator,
  changePasswordValidator,
  deleteAdminValidator
} = require('../utils/validators/adminValidators');

const {
  getAllAdmins,
  getAdmin,
  createAdmin,
  updateAdminData,
  deleteAdmin,
  changeAdminPassword
} = require('../controllers/adminController');

// Not use auth to test routes
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router()

router.route('/')
  .get(getAllAdmins)
  .post(createAdminValidator, createAdmin);

router.route('/:id')
  .get(getAdminValidator, getAdmin)
  .put(updateAdminValidator, updateAdminData)
  .delete(deleteAdminValidator, deleteAdmin);

router.route('/changeAdminPassword/:id').put(changePasswordValidator, changeAdminPassword);

module.exports = router;