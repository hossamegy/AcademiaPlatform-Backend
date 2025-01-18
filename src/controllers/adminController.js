const Admins = require('../models/adminModel');
const factory = require('./factory');

const getAllAdmins = factory.getAllDocument(Admins, 'Admins');

const getAdmin = factory.getDocumentById(Admins, 'Admins');

const createAdmin = factory.createDocument(Admins, 'Admins');

const updateAdminData = factory.updateDocument(Admins, 'Admins');

const deleteAdmin = factory.deleteDocument(Admins, 'Admins');

const changeAdminPassword = factory.changePassword(Admins, 'Admins');


module.exports = {
  getAllAdmins,
  getAdmin,
  createAdmin,
  updateAdminData,
  deleteAdmin,
  changeAdminPassword
};
