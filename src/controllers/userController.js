const asyncWrapper = require('../middlewares/async-wrapper');
const BadError = require('../errors/bad-error');
const Users = require('../models/userModel');
const factory = require('./factory');

const getAllUsers = factory.getAllDocument(Users, 'Users');

const getUser = factory.getDocumentById(Users, 'User');

const createUser = factory.createDocument(Users, 'User');

const updateUserData = factory.updateDocument(Users, 'user');

const changeUserPassword = factory.changePassword(Users, 'User');

const deleteUser = factory.deleteDocument(Users, 'User');




module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserData,
  changeUserPassword,
  deleteUser
};
