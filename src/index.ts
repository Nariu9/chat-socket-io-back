import express, {Request, Response} from 'express'
import http from 'http'
import {Server, Socket} from 'socket.io'
import crypto from 'crypto'

type Message = {
    id: string
    message: string
    user: User
}

type User = {
    id: string
    name: string
}

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

const usersState = new Map()

const messages: Message[] = [
    {id: uuid(), message: 'Hello! How are you?', user: {id: uuid(), name: 'Artem'}},
    {id: uuid(), message: 'Fine, thanks', user: {id: uuid(), name: 'Alex'}},
    {id: uuid(), message: 'Where are you?', user: {id: uuid(), name: 'Hannah'}}
]

io.on('connection', (socket: Socket) => {

    usersState.set(socket, {id: uuid(), name: 'anonymous'})

    socket.on('client-name-set', (userName: string | unknown) => {
        if (typeof userName !== 'string') return

        const user: User = usersState.get(socket)
        user.name = userName
    })

    socket.on('disconnect', () => {
        usersState.delete(socket)
    })

    socket.on('client-message-sent', (message: string | unknown) => {
        if (typeof message !== 'string') return

        const user: User = usersState.get(socket)

        const newMessage = {id: uuid(), message, user: {id: user.id, name: user.name}};
        messages.push(newMessage)
        io.emit('new-message-sent', newMessage)
    });

    socket.emit('init-messages-published', messages)
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});