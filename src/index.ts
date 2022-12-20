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

io.on('connection', (socket: Socket) => {
    console.log('a user connected');
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});