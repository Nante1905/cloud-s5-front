import { io } from "socket.io-client";
import { SOCKET_URL } from "./shared/env/env";

export const socket = io(SOCKET_URL);
