const { Schema, model } = require('mongoose');
const Document = require('./documentsModel');

const userSchema = new Schema({
    _id: String,
    name: "String",
    email: "String",
    documents: [Document]
});

module.exports = model('Users', userSchema);