const app = require('express')();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const { connectToDatabase, findOrCreateDocument, saveDocument } = require('./db');

connectToDatabase();

const io = new Server(server, {
    cors: {
        origin: "https://google-docs-clone-client-delta.vercel.app/",
    }
});

io.on('connection', (socket) => {
    console.log('A user got connected : ', socket.id);

    socket.on('get-document', async (documentId) => {
        const document = await findOrCreateDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);

        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });

        socket.on('save-document', (data) => {
            saveDocument(documentId, data);
        });
    });
});

app.get('/', (req, res) => {
    res.send('Server is running ...');
});

server.listen(process.env.PORT || 4000, () => {
    console.log('Server is running on port 4000');
});