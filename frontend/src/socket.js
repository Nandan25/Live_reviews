import { io } from "socket.io-client";
import { api_server } from "./constants";
const url = api_server;

export const socket = io(url);