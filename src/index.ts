import express, {Request, Response} from 'express'
import http from 'http'
import {Server, Socket} from 'socket.io'
import cors from 'cors'

const port = process.env.PORT || 5000

const app = express();
app.use(cors())
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, it\'s WS server');
});

io.on('connection', (socket: Socket) => {
    console.log('a user connected');
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});