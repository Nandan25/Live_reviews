import express from "express";
import "dotenv/config";
import { connect } from "./db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import userRoute from './routes/userRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import cors from 'cors';

/* Connect mongodb */
connect();

const port = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors());

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("ADD_REVIEW", () => { console.log('NEW_REVIEW'); io.emit('NEW_REVIEW'); });
    socket.on("EDIT_REVIEW", () => { console.log('EDITTED_REVIEW'); io.emit('NEW_REVIEW'); });
    socket.on("DELETE_REVIEW", () => { console.log('DELETE_REVIEW'); io.emit('NEW_REVIEW'); });
});

app.use('/user', userRoute);
app.use('/review', reviewRoute);

httpServer.listen(port, () => {

    return console.log(`Express is listening at http://localhost:${port}`);
});
