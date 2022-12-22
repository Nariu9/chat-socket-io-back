import express, {Request, Response} from 'express'
import http from 'http'
import {Server, Socket} from 'socket.io'
import crypto from 'crypto'


const uuid = () => crypto.randomUUID({disableEntropyCache: true})
const port = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, it\'s WS server');
});

const messages = [
    {id: uuid(), message: 'Hello! How are you?', user: {id: uuid(), name: 'Artem'}},
    {id: uuid(), message: 'Fine, thanks', user: {id: uuid(), name: 'Alex'}},
    {id: uuid(), message: 'Where are you?', user: {id: uuid(), name: 'Hannah'}}
]

io.on('connection', (socket: Socket) => {

    socket.on('client-message-sent', (message: string) => {
        const newMessage = {id: uuid(), message, user: {id: uuid(), name: 'Hannah'}};
        messages.push(newMessage)
        io.emit('new-message-sent', newMessage)
    });

    socket.emit('init-messages-published', messages)
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});