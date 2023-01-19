const mongoose = require('mongoose');
const Document = require('./models/documentsModal');

const MONDO_DB_URL = 'mongodb+srv://Avinash:avinash-google-docs-clone@cluster0.dagnh5r.mongodb.net/?retryWrites=true&w=majority';

const connectToDatabase = async () => {
    const isConnected = await mongoose.connect(MONDO_DB_URL);
    if(isConnected) console.log('Connected to database ...');
    else console.log('Failed to connect to database ...');
}

const findOrCreateDocument = async (id) => {
    if(id == null) return;
    const document = await Document.findById(id);
    if(document) return document;
    return await Document.create({ _id: id, data: '' });
}

const saveDocument = async (id, data) => {
    if(id == null) return;
    const document = await Document.findOneAndUpdate({ _id: id}, { data: data });
}

module.exports = { connectToDatabase, findOrCreateDocument, saveDocument };