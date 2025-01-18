const statusCode = require('http-status-codes');
const asyncWrapper = require('../middlewares/async-wrapper');
const BadError = require('../errors/bad-error');
const bcrypt = require('bcrypt');

const getAllDocument = (Model, documentName) =>
  asyncWrapper(async (req, res) => {
    const documents = await Model.find({});

    if (!documents || documents.length === 0) {
      throw new BadError(`No ${documentName} found`);
    }

    res.status(statusCode.OK).json(
      {
        messages: 'success',
        data: documents
      });
  });

const getDocumentById = (Model, documentName) => asyncWrapper(async (req, res) => {
  const { id: DocumentID } = req.params;
  const document = await Model.find({ _id: DocumentID });

  if (!document) {
    throw new BadError(`No ${documentName} found with id ${DocumentID}`);
  }

  res.status(statusCode.OK).json(
    {
      messages: 'success',
      data: document
    });
});

const createDocument = (Model, documentName) => asyncWrapper(async (req, res, next) => {
  const newDocument = await Model.create({ ...req.body });

  if (!newDocument) {
    return next(new BadError(`Error creating the ${documentName}`));
  }

  res.status(statusCode.CREATED).json(
    {
      message: `${documentName} created successfully`,
      data: newDocument
    });
});

const changePassword = (Model, documentName) => asyncWrapper(async (req, res, next) => {
  const { _id: documentID } = req.params;
  const document = await Model.findOneAndUpdate(
    documentID,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangeAt: Date.now()
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new BadError(`No ${documentName} found with id ${documentID}`));
  }

  res.status(200).json({ message: '${documentName} updated successfully', document });
});


const deleteDocument = (Model, documentName) => asyncWrapper(async (req, res, next) => {
  const { id: DocumentsID } = req.params;
  const document = await Model.findOneAndDelete({ _id: DocumentsID });

  if (!document) {
    return next(new BadError(`No ${documentName} found with id ${DocumentsID}`));
  }

  res.status(200).json({ message: `${documentName} deleted successfully`, document });
});

const updateDocument = (Model, documentName) => asyncWrapper(async (req, res, next) => {
  const { _id: documentID } = req.params;
  const document = await Model.findOneAndUpdate(
    documentID,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!document) {
    return next(new BadError(`No ${documentName} found with id ${documentID}`));
  }

  res.status(200).json({ message: `${documentName} updated successfully`, document });
});


const getRelatedDocuments = (Model, documentName) => asyncWrapper(async (req, res) => {
  const documentsID = req.params.id;
  const documents = await Model.findOne({ _id: documentsID })
    .select('documentsID')
    .populate('documentsID');

  if (!documents) {
    throw new BadError(`No ${documentName} with this id`);
  }

  if (!Array.isArray(documents.documentsID) || documents.documentsID.length === 0) {
    throw new BadError(`No ${documentName} associated with this entity`);
  }

  res.status(200).json({
    message: 'success',
    data: documents.documentsID,
  });
});



module.exports = {
  getAllDocument,
  getDocumentById,
  createDocument,
  updateDocument,
  changePassword,
  deleteDocument,
  getRelatedDocuments
}
