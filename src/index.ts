import express, {Request, Response} from 'express'
import http from 'http'
import {Server, Socket} from 'socket.io'

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
    {id: 'dssadsa', message: 'Hello! How are you?', user: {id: 'dsasdadsa', name: 'Artem'}},
    {id: 'gfdgfd', message: 'Fine, thanks', user: {id: 'ggggggggg', name: 'Alex'}},
    {id: 'eeeeee', message: 'Where are you?', user: {id: 'qqqqq', name: 'Hannah'}}
]

io.on('connection', (socket: Socket) => {

    socket.on('client-message-sent', (message: string) => {
        console.log(message);
    });

    socket.emit('init-messages-published', messages)
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});