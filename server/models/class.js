var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = new mongoose.Schema({

    _users: [{
      type: Schema.Types.ObjectId,
      ref: 'users'
    }],
    name: String,
    description: String,

},{timestamps: true});
module.exports = mongoose.model('classes', ClassSchema);
mongoose.model('classes', ClassSchema);
