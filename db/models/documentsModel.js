const { Schema, model } = require('mongoose');

const documentSchema = new Schema({
    _id: String,
    title: String,
    lastUpdated: String,
    data: Object
});

module.exports = model('Document', documentSchema);