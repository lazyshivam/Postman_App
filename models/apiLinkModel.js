const mongoose = require('mongoose');
const {Schema} =mongoose;

const apiLinkSchema = new Schema({
  user: {
    type:String,
    ref: 'User',
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  method:{
    type: String,
    required: true,
  }
});

const ApiLink = mongoose.model('ApiLink', apiLinkSchema);

module.exports = ApiLink;
