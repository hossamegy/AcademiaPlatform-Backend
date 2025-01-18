const express = require('express');
const {
    getUserValidator,
    createUserValidator,
    updateUserValidator,
    changeUserPasswordValidator,
    deleteUserValidator
  } = require('../utils/validators/userValidators');
const {
    getAllUsers,
    getUser,
    createUser,
    updateUserData,
    changeUserPassword,
    deleteUser
  } = require('../controllers/userController');

// Not use auth to test routes
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router()

router.route('/')
    .get(getAllUsers)
    .post(createUserValidator, createUser);

router.route('/:id')
    .get(getUserValidator, getUser)
    .put(updateUserValidator, updateUserData)
    .delete(deleteUserValidator, deleteUser);

router.route('/changeUserPassword/:id').put(changeUserPasswordValidator, changeUserPassword);
module.exports = router;