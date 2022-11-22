import express, {Request, Response} from 'express'
import http from 'http'
import {Server, Socket} from 'socket.io'

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, it\'s WS server');
});

io.on('connection', (socket: Socket) => {
    console.log('a user connected');
});

server.listen(5000, () => {
    console.log('listening on *:5000');
});