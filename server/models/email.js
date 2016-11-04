var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailSchema = new mongoose.Schema({
	message: String
},{timestamps: true});
module.exports = mongoose.model('emails', EmailSchema);
mongoose.model('emails', EmailSchema);
