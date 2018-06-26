const mongoose = require('mongoose');
const { objectIdValid } = require('../utils/objectIdValid');
const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title required']
  },
  description: {
    type: String
  },
  members: {
    type: [ObjectId],
    ref: 'User',
    required: [true, 'Project must contain at least one user'],
    validate: {
      isAsync: true,
      validator: (val, cb) => objectIdValid('User', val, cb),
      message: 'Must be an id for an existing user'
    }
  },
  tags: {
    type: [ObjectId],
    ref: 'Tag',
    validate: {
      isAsync: true,
      validator: (val, cb) => objectIdValid('Tag', val, cb),
      message: 'Must be an id for an existing tag'
    }
  }
});

module.exports = mongoose.model('Project', projectSchema);